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

async function syncToSysteme(params: {
  email: string;
  firstName: string;
  crisisCategory: string;
  urgency: string;
  resultType: string;
}): Promise<boolean> {
  if (!SYSTEME_API_KEY) return false;

  const tagIds: number[] = [SYSTEME_TAG_IDS["lls-assessment"]];

  const categoryTagId = SYSTEME_TAG_IDS[`lls-${params.crisisCategory}`];
  if (categoryTagId) tagIds.push(categoryTagId);

  if (params.resultType === "coach_referral") {
    tagIds.push(SYSTEME_TAG_IDS["lls-coach-referral"]);
  }

  try {
    const res = await fetch(`${SYSTEME_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": SYSTEME_API_KEY,
      },
      body: JSON.stringify({
        email: params.email,
        firstName: params.firstName || undefined,
        tagIds,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Systeme.io sync failed:", res.status, error);
      return false;
    }

    return true;
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
  return route?.id ?? null;
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
