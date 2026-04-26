import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const CATEGORY_LABELS: Record<string, string> = {
  grief: "Grief & loss",
  relationship: "Relationship & divorce",
  health: "Health & addiction",
  financial: "Financial hardship",
  spiritual: "Spiritual awakening",
  career: "Career & purpose",
};

const CTA_HEADLINES: Record<string, string> = {
  grief: "Are you dealing with grief or loss?",
  relationship: "Going through a relationship or divorce?",
  health: "Struggling with health or addiction?",
  financial: "Facing financial hardship?",
  spiritual: "Experiencing a spiritual awakening?",
  career: "Looking for purpose or a career change?",
};

async function getEpisode(idOrSlug: string) {
  return prisma.episode.findFirst({
    where: {
      publishStatus: "published",
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: { cta: true },
  });
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const episode = await getEpisode(params.id);
  if (!episode) notFound();

  if (episode.slug && params.id !== episode.slug) {
    redirect(`/episodes/${episode.slug}`);
  }

  const title = episode.titleYoutube ?? episode.titleOriginal;
  const category = episode.crisisCategory
    ? CATEGORY_LABELS[episode.crisisCategory]
    : null;
  const ctaHeadline = episode.crisisCategory
    ? CTA_HEADLINES[episode.crisisCategory]
    : "Ready to start your transformation?";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-brand-purple transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/episodes"
            className="hover:text-brand-purple transition-colors"
          >
            Episodes
          </Link>
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{title}</span>
        </div>

        {/* Episode header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {episode.episodeNumber && (
              <span className="text-xs font-semibold text-gray-400">
                Episode {episode.episodeNumber}
              </span>
            )}
            {category && (
              <span className="text-xs font-semibold bg-brand-gold text-brand-purple-dark px-3 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {title}
          </h1>
          {episode.guestName && (
            <p className="text-lg text-gray-500">
              with{" "}
              <span className="font-medium text-gray-700">
                {episode.guestName}
              </span>
            </p>
          )}
        </div>

        {/* YouTube embed or thumbnail */}
        {episode.youtubeId ? (
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-8 bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${episode.youtubeId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (episode.youtubeThumbnailUrl || episode.coverArtUrl || episode.thumbnailUrl) ? (
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-8 bg-brand-purple-dark">
            <img
              src={(episode.youtubeThumbnailUrl || episode.coverArtUrl || episode.thumbnailUrl)!}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {/* Audio player */}
        {episode.audioUrl && (
          <div className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">
              Listen to the episode
            </p>
            <audio controls className="w-full" src={episode.audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Assessment CTA */}
        <div className="bg-brand-purple rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">{ctaHeadline}</p>
            <p className="text-gray-300 text-sm">
              Take our free assessment and find your path forward.
            </p>
          </div>
          <Link
            href="/assessment"
            className="btn-primary whitespace-nowrap shrink-0"
          >
            Take the assessment →
          </Link>
        </div>

        {/* Show notes */}
        {(episode.descriptionWebsite ?? episode.descriptionOriginal) && (
          <div className="prose prose-gray max-w-none mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About this episode
            </h2>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {episode.descriptionWebsite ?? episode.descriptionOriginal}
            </div>
          </div>
        )}

        {/* Guest bio */}
        {episode.guestBio && (
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              About {episode.guestName ?? "the guest"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {episode.guestBio}
            </p>
          </div>
        )}

        {/* Episode cover art — shown when different from the video thumbnail */}
        {episode.coverArtUrl && episode.coverArtUrl !== episode.youtubeThumbnailUrl && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Episode artwork
            </h2>
            <img
              src={episode.coverArtUrl}
              alt={`${title} cover art`}
              className="w-48 rounded-xl border border-gray-100 shadow-sm"
            />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Enjoyed this episode?{" "}
            <Link
              href="/episodes"
              className="text-brand-purple font-medium hover:underline"
            >
              Browse all episodes →
            </Link>
          </p>
        </div>
      </div>

      <footer className="bg-brand-purple-dark border-t border-brand-purple mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Limitless Living Show with Chuck Anderson
          </p>
          <div className="flex items-center gap-4">
            <Link href="/episodes" className="text-xs text-gray-400 hover:text-white transition-colors">Episodes</Link>
            <Link href="/assessment" className="text-xs text-gray-400 hover:text-white transition-colors">Assessment</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
