import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SYSTEME_API_KEY = process.env.SYSTEME_API_KEY ?? "";
const SYSTEME_API_URL = "https://api.systeme.io/api";

interface AssessmentBody {
  firstName: string;
  email: string;
  crisisCategory: string;
  crisisDuration: string;
  urgency: string;
  sourceEpisodeId?: string;
}

function computeScore(urgency: string): number {
  const scores: Record<string, number> = {
    crisis: 10,
    struggling: 7,
    healing: 4,
    exploring: 2,
  };
  return scores[urgency] ?? 5;
}

function computeResultType(score: number): string {
  if (score >= 8) return "coach_referral";
  if (score >= 5) return "resource";
  return "nurture";
}

const SYSTEME_TAG_IDS: Record<string, number> = {
  "lls-assessment": 1975330,
  "lls-grief": 1975331,
  "lls-relationship": 1975332,
  "lls-health": 1975333,
  "lls-financial": 1975334,
  "lls-spiritual": 1975335,
  "lls-career": 1975336,
  "lls-coach-referral": 1975337,
};

async function getOrCreateSystemeContact(
  email: string,
  firstName: string
): Promise<string | null> {
  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": SYSTEME_API_KEY,
  };

  const getRes = await fetch(
    `${SYSTEME_API_URL}/contacts?email=${encodeURIComponent(email)}`,
    { headers }
  );

  if (getRes.ok) {
    const getData = await getRes.json();
    const existing = getData?.items?.[0];
    if (existing?.id) return String(existing.id);
  }

  const createRes = await fetch(`${SYSTEME_API_URL}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      firstName: firstName || undefined,
    }),
  });

  if (createRes.ok) {
    const created = await createRes.json();
    if (created?.id) return String(created.id);
  }

  const error = await createRes.text().catch(() => "unknown");
  console.error("Systeme.io create contact failed:", createRes.status, error);
  return null;
}

async function addTagsToSystemeContact(
  contactId: string,
  tagIds: number[]
): Promise<boolean> {
  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": SYSTEME_API_KEY,
  };

  const results = await Promise.all(
    tagIds.map((tagId) =>
      fetch(`${SYSTEME_API_URL}/contacts/${contactId}/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tagId }),
      }).then((r) => r.ok)
    )
  );

  return results.every(Boolean);
}

async function syncToSysteme(params: {
  email: string;
  firstName: string;
  crisisCategory: string;
  urgency: string;
  resultType: string;
}): Promise<boolean> {
  if (!SYSTEME_API_KEY) return false;

  try {
    const contactId = await getOrCreateSystemeContact(
      params.email,
      params.firstName
    );
    if (!contactId) return false;

    const tagIds: number[] = [SYSTEME_TAG_IDS["lls-assessment"]];
    const categoryTagId = SYSTEME_TAG_IDS[`lls-${params.crisisCategory}`];
    if (categoryTagId) tagIds.push(categoryTagId);
    if (params.resultType === "coach_referral") {
      tagIds.push(SYSTEME_TAG_IDS["lls-coach-referral"]);
    }

    return await addTagsToSystemeContact(contactId, tagIds);
  } catch (err) {
    console.error("Systeme.io sync error:", err);
    return false;
  }
}

async function getAffiliateRoute(
  crisisCategory: string,
  urgency: string
): Promise<string | null> {
  const route = await prisma.affiliateRoute.findFirst({
    where: {
      crisisCategory,
      isActive: true,
      OR: [{ urgencyLevel: urgency }, { urgencyLevel: "any" }],
    },
    orderBy: { priority: "asc" },
  });
  if (route) return route.id;

  const defaultRoute = await prisma.affiliateRoute.findFirst({
    where: { isDefault: true, isActive: true },
    orderBy: { priority: "asc" },
  });
  return defaultRoute?.id ?? null;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AssessmentBody;

  const { firstName, email, crisisCategory, crisisDuration, urgency, sourceEpisodeId } = body;

  if (!email || !crisisCategory || !urgency) {
    return NextResponse.json(
      { error: "email, crisisCategory, and urgency are required" },
      { status: 400 }
    );
  }

  const score = computeScore(urgency);
  const resultType = computeResultType(score);
  const affiliateRouteId = await getAffiliateRoute(crisisCategory, urgency);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  const lead = await prisma.lead.create({
    data: {
      email,
      firstName: firstName || null,
      crisisCategory,
      crisisDuration: crisisDuration || null,
      urgency,
      score,
      resultType,
      sourceEpisodeId: sourceEpisodeId || null,
      affiliateRouteId,
      ipAddress: ip,
      emailSynced: false,
    },
  });

  const synced = await syncToSysteme({
    email,
    firstName,
    crisisCategory,
    urgency,
    resultType,
  });

  if (synced) {
    await prisma.lead.update({
      where: { id: lead.id },
      data: { emailSynced: true },
    });
  }

  return NextResponse.json({
    success: true,
    leadId: lead.id,
    resultType,
    crisisCategory,
    urgency,
    score,
  });
}
