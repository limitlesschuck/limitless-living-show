const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-6";

export interface GeneratedEpisodeContent {
  youtubeTitles: string[];
  youtubeDescription: string;
  podcastTitle: string;
  websiteDescription: string;
  tags: string[];
  suggestedCategory: string;
}

export async function generateEpisodeContent(params: {
  titleOriginal: string;
  descriptionOriginal: string;
  guestName: string | null;
  crisisCategory: string | null;
}): Promise<GeneratedEpisodeContent> {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) throw new Error("CLAUDE_API_KEY not set");

  const categoryHint = params.crisisCategory
    ? `The episode has been categorised as: ${params.crisisCategory}.`
    : "Please suggest the most appropriate crisis category from: grief, relationship, health, financial, spiritual, career.";

  const prompt = `You are an expert podcast content strategist specialising in personal transformation content. Your job is to rewrite podcast episode metadata to maximise YouTube discovery and emotional resonance for people going through a personal crisis or life transition.

Here is the episode information:
Title: ${params.titleOriginal}
Guest: ${params.guestName ?? "Not specified"}
Description: ${params.descriptionOriginal}
${categoryHint}

Generate the following and return ONLY valid JSON with no markdown, no code fences, no preamble:

{
  "youtubeTitles": [
    "Title option 1 — lead with the pain/crisis state, include specific detail, under 70 chars",
    "Title option 2 — different angle on the same story",
    "Title option 3 — most search-optimised version"
  ],
  "youtubeDescription": "Full YouTube description (300-400 words). First 2 lines must hook the viewer before the fold. Include timestamps if available from the original. End with a CTA to take the free assessment. Use line breaks for readability.",
  "podcastTitle": "Rewritten podcast title optimised for Apple and Spotify search — under 60 chars, lead with topic not guest name",
  "websiteDescription": "SEO-optimised episode page description (150-200 words). Include the primary search keyword naturally. Write for someone searching for help with this specific crisis.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"],
  "suggestedCategory": "one of: grief, relationship, health, financial, spiritual, career"
}`;

  const res = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    if (res.status === 529 || res.status === 402) {
      throw new Error(
        "Anthropic API credit limit reached — please add credits at console.anthropic.com"
      );
    }
    if (res.status === 401) {
      throw new Error(
        "Anthropic API key is invalid — check CLAUDE_API_KEY in Replit Secrets"
      );
    }
    const error = await res.text();
    throw new Error(`Claude API error: ${res.status} — ${error}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as GeneratedEpisodeContent;
  } catch {
    throw new Error(`Failed to parse Claude response: ${text}`);
  }
}
