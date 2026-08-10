import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCategoryOptions } from "@/lib/categories";
import SiteLogo from "@/components/SiteLogo";
import showConfig from "@/show.config";

const RESULT_CONTENT: Record<
  string,
  {
    headline: string;
    subtext: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryLabel: string;
  }
> = {
  coach_referral: {
    headline: "You deserve real support right now",
    subtext:
      "Based on your answers, you're dealing with something significant and would benefit most from working with a specialist coach. We've matched you with coaches who have helped others through exactly what you're experiencing.",
    ctaLabel: "Connect with a coach →",
    ctaHref: showConfig.resultLinks.coachReferral,
    secondaryLabel: "Browse episodes first",
  },
  resource: {
    headline: "You're on the right path — here's what will help",
    subtext:
      "You're at a stage where the right stories, tools, and resources can make a real difference. We've curated episodes and resources specifically for what you're going through.",
    ctaLabel: "Browse matching episodes →",
    ctaHref: "/episodes",
    secondaryLabel: "Explore all resources",
  },
  nurture: {
    headline: "Great — you're already thinking ahead",
    subtext:
      "You're in exploration mode, which is a great place to be. We've put together a selection of episodes that will give you real insights and help you build clarity for what's next.",
    ctaLabel: "Start exploring episodes →",
    ctaHref: "/episodes",
    secondaryLabel: "Browse all episodes",
  },
};

function AffiliateOfferCard({
  offer,
}: {
  offer: { id: string; affiliateName: string; affiliateUrl: string; description: string | null; imageUrl: string | null };
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm border border-gray-100">
      {offer.imageUrl && (
        <img
          src={offer.imageUrl}
          alt={offer.affiliateName}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1">
        <p className="font-bold text-gray-900">{offer.affiliateName}</p>
        {offer.description && (
          <p className="text-sm text-gray-600">{offer.description}</p>
        )}
        <a
          href={offer.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 bg-brand-admin-accent text-brand-purple-dark font-bold text-sm rounded-lg hover:bg-brand-admin-accent-light transition-colors"
        >
          Learn more →
        </a>
      </div>
    </div>
  );
}

async function getMatchingEpisodes(crisisCategory: string) {
  return prisma.episode.findMany({
    where: {
      publishStatus: "published",
      crisisCategory,
    },
    orderBy: { captivatePublishedAt: "desc" },
    take: 3,
    select: {
      id: true,
      slug: true,
      titleOriginal: true,
      titleYoutube: true,
      guestName: true,
      thumbnailUrl: true,
      coverArtUrl: true,
      youtubeThumbnailUrl: true,
      episodeNumber: true,
      durationSeconds: true,
    },
  });
}

async function getFeaturedCollaborators(crisisCategory: string) {
  return prisma.coach.findMany({
    where: {
      isActive: true,
      specialties: { has: crisisCategory },
    },
    orderBy: { priority: "asc" },
    take: 3,
    include: {
      episode: {
        select: {
          episodeNumber: true,
          slug: true,
          id: true,
        },
      },
    },
  });
}

async function getAffiliateOffers(
  crisisCategory: string,
  urgency: string,
  showAboveExperts: boolean
) {
  const matched = await prisma.affiliateRoute.findMany({
    where: {
      crisisCategory,
      isActive: true,
      showAboveExperts,
      OR: [{ urgencyLevel: urgency }, { urgencyLevel: "any" }],
    },
    orderBy: { priority: "asc" },
  });
  if (matched.length > 0) return matched;

  return prisma.affiliateRoute.findMany({
    where: { isDefault: true, isActive: true, showAboveExperts },
    orderBy: { priority: "asc" },
  });
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { type?: string; category?: string; urgency?: string };
}) {
  const resultType = searchParams.type ?? "resource";
  const crisisCategory = searchParams.category ?? "career";
  const urgency = searchParams.urgency ?? "exploring";

  const content = RESULT_CONTENT[resultType] ?? RESULT_CONTENT.resource;

  const [episodes, aboveExpertsOffers, belowExpertsOffers, featuredCollaborators, categories] = await Promise.all([
    getMatchingEpisodes(crisisCategory),
    getAffiliateOffers(crisisCategory, urgency, true),
    getAffiliateOffers(crisisCategory, urgency, false),
    getFeaturedCollaborators(crisisCategory),
    getCategoryOptions(),
  ]);

  const categoryLabel = categories.find((c) => c.value === crisisCategory)?.label ?? crisisCategory;

  const affiliateUrl = belowExpertsOffers[0]?.affiliateUrl ?? aboveExpertsOffers[0]?.affiliateUrl ?? null;
  const ctaHref =
    resultType === "coach_referral" && affiliateUrl
      ? affiliateUrl
      : content.ctaHref;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-purple">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg">
            <SiteLogo />
          </Link>
          <span className="text-gray-300 text-sm">Your results</span>
        </div>
      </div>

      {/* Gold progress bar — complete */}
      <div className="h-1 bg-brand-gold" />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Result header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-gold bg-opacity-10 text-brand-gold-dark text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Your personalised result
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
            {content.headline}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Based on what you shared about{" "}
            <span className="font-medium text-brand-purple">
              {categoryLabel}
            </span>
            , here&apos;s what we recommend.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            {content.subtext}
          </p>
        </div>

        {/* Primary CTA */}
        <div className="bg-brand-purple rounded-2xl p-6 text-center mb-8">
          <a
            href={ctaHref}
            className="btn-primary w-full block text-center mb-3"
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {content.ctaLabel}
          </a>
          <Link
            href="/episodes"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            {content.secondaryLabel}
          </Link>
        </div>

        {/* Affiliate offers — above Recommended Experts */}
        {aboveExpertsOffers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Recommended Programs &amp; Services
            </h2>
            <div className="space-y-3">
              {aboveExpertsOffers.map((offer) => (
                <AffiliateOfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        )}

        {/* Featured collaborators */}
        {featuredCollaborators.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Recommended Experts
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              These recommended experts can help you with the exact challenge you described in the assessment
            </p>
            <div className="space-y-3">
              {featuredCollaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="bg-brand-purple-pale rounded-2xl p-5 flex gap-4 items-start border-l-4 border-brand-admin-accent"
                >
                  {collaborator.photoUrl && (
                    <img
                      src={collaborator.photoUrl}
                      alt={collaborator.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{collaborator.name}</p>
                    {collaborator.bio && (
                      <p className="text-sm text-gray-600">{collaborator.bio}</p>
                    )}
                    {collaborator.profileUrl && (
                      <a
                        href={collaborator.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-brand-admin-accent text-brand-purple-dark font-bold text-sm rounded-lg hover:bg-brand-admin-accent-light transition-colors"
                      >
                        Connect with {collaborator.name.split(" ")[0]} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affiliate offers — below Recommended Experts */}
        {belowExpertsOffers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Recommended Programs &amp; Services
            </h2>
            <div className="space-y-3">
              {belowExpertsOffers.map((offer) => (
                <AffiliateOfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        )}

        {/* Matching episodes */}
        {episodes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Episodes matched to your situation
            </h2>
            <div className="space-y-3">
              {episodes.map((ep) => {
                const title = ep.titleYoutube ?? ep.titleOriginal;
                const duration = ep.durationSeconds
                  ? `${Math.floor(ep.durationSeconds / 60)} min`
                  : null;
                return (
                  <Link
                    key={ep.id}
                    href={ep.slug ? `/episodes/${ep.slug}` : `/episodes/${ep.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:shadow-sm transition-all group"
                  >
                    {(ep.youtubeThumbnailUrl || ep.coverArtUrl || ep.thumbnailUrl) ? (
                      <img
                        src={(ep.youtubeThumbnailUrl || ep.coverArtUrl || ep.thumbnailUrl)!}
                        alt={title}
                        className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-14 bg-brand-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-gold text-xs font-bold">
                          {showConfig.showInitials}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-purple transition-colors">
                        {title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        {ep.guestName && <span>{ep.guestName}</span>}
                        {duration && <span>{duration}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Link
                href={`/episodes?category=${crisisCategory}`}
                className="text-sm text-brand-purple font-medium hover:text-brand-gold transition-colors"
              >
                View all {categoryLabel} episodes →
              </Link>
            </div>
          </div>
        )}

        {/* Empty state — no matching episodes yet */}
        {episodes.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-3">
              We&apos;re adding more episodes soon.
            </p>
            <Link
              href="/episodes"
              className="text-sm text-brand-purple font-medium hover:underline"
            >
              Browse all episodes →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
