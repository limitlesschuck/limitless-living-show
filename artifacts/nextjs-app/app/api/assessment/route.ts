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

async function syncToSysteme(params: {
  email: string;
  firstName: string;
  crisisCategory: string;
  urgency: string;
  resultType: string;
}): Promise<boolean> {
  if (!SYSTEME_API_KEY) return false;

  try {
    const tag = `lls-${params.crisisCategory}-${params.urgency}`;
    const res = await fetch(`${SYSTEME_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": SYSTEME_API_KEY,
      },
      body: JSON.stringify({
        email: params.email,
        firstName: params.firstName,
        fields: [
          { slug: "crisis_category", value: params.crisisCategory },
          { slug: "urgency_level", value: params.urgency },
          { slug: "result_type", value: params.resultType },
        ],
        tags: [tag, "lls-assessment"],
      }),
    });
    return res.ok;
  } catch {
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
