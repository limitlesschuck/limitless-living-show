import Link from "next/link";
import showConfig from "@/show.config";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-purple-dark border-t border-brand-purple mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} {showConfig.showName} with {showConfig.hostName}
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/episodes" className="text-xs text-gray-400 hover:text-white transition-colors">Episodes</Link>
          <Link href="/guides" className="text-xs text-gray-400 hover:text-white transition-colors">Guides</Link>
          <Link href="/assessment" className="text-xs text-gray-400 hover:text-white transition-colors">Assessment</Link>
          <a href={showConfig.platforms.apple} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">Apple Podcasts</a>
          <a href={showConfig.platforms.spotify} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">Spotify</a>
          <a href={showConfig.platforms.youtube} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
