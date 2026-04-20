const CAPTIVATE_API_BASE = "https://api.captivate.fm";

export interface CaptivateEpisode {
  id: string;
  title: string;
  shownotes: string;
  duration: number;
  published_at: string;
  media_url: string;
  episode_art?: string;
  status: string;
}

interface CaptivateAuthResponse {
  token: {
    access_token: string;
  };
}

interface CaptivateEpisodesResponse {
  episodes: CaptivateEpisode[];
}

async function getAccessToken(): Promise<string> {
  const userId = process.env.CAPTIVATE_USER_ID;
  const apiKey = process.env.CAPTIVATE_API_KEY;

  if (!userId || !apiKey) {
    throw new Error("CAPTIVATE_USER_ID or CAPTIVATE_API_KEY not set");
  }

  const res = await fetch(`${CAPTIVATE_API_BASE}/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: userId, token: apiKey }),
  });

  if (!res.ok) {
    throw new Error(`Captivate auth failed: ${res.status}`);
  }

  const data = (await res.json()) as CaptivateAuthResponse;
  return data.token.access_token;
}

export async function fetchCaptivateEpisodes(
  showId: string
): Promise<CaptivateEpisode[]> {
  const accessToken = await getAccessToken();

  const res = await fetch(`${CAPTIVATE_API_BASE}/shows/${showId}/episodes`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Captivate episodes fetch failed: ${res.status}`);
  }

  const data = (await res.json()) as CaptivateEpisodesResponse;
  return data.episodes ?? [];
}
