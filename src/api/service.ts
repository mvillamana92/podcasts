export const TOP_PODCASTS_URL = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
export const PODCAST_DETAILS_URL = "https://itunes.apple.com/lookup?id=";

export const getTopPodcasts = async (): Promise<any> => {
  const response = await fetch(TOP_PODCASTS_URL);
  if (!response.ok) throw new Error("Failed to fetch top podcasts");
  return response.json();
};

export const getPodcastDetails = async (podcastId: string): Promise<any> => {
  const url = PODCAST_DETAILS_URL + encodeURIComponent(podcastId);
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch podcast details");
  return response.json();
};
