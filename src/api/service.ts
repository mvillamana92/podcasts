export const TOP_PODCASTS_URL = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
export const PODCAST_DETAILS_URL = "https://itunes.apple.com/lookup?id=";

const isDev = import.meta.env && import.meta.env.DEV;
const PROXY_URL = isDev ? "https://cors-anywhere.herokuapp.com/" : "/api/proxy?url=";

export const getTopPodcasts: () => Promise<any> = async () => {
  const response = await fetch(TOP_PODCASTS_URL);
  if (!response.ok) throw new Error("Failed to fetch top podcasts");
  return response.json();
};

export const getPodcastDetails: (podcastId: string) => Promise<any> = async (podcastId) => {
  if (!podcastId) throw new Error("No podcastId provided");
  const apiUrl = `${PODCAST_DETAILS_URL}${encodeURIComponent(podcastId)}`;
  const proxyUrl = isDev ? PROXY_URL + apiUrl : PROXY_URL + encodeURIComponent(apiUrl);
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error("Failed to fetch podcast details via proxy");
  return response.json();
};

export const getPodcastEpisodes: (podcastId: string, limit?: number) => Promise<any> = async (podcastId, limit = 9) => {
  if (!podcastId) throw new Error("No podcastId provided");
  const apiUrl = `${PODCAST_DETAILS_URL}${encodeURIComponent(podcastId)}&entity=podcastEpisode&limit=${limit}`;
  const proxyUrl = isDev ? PROXY_URL + apiUrl : PROXY_URL + encodeURIComponent(apiUrl);
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error("Failed to fetch podcast episodes via proxy");
  return response.json();
};
