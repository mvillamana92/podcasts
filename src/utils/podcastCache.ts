const ONE_DAY = 1000 * 60 * 60 * 24;

import { GET_TOP_PODCASTS } from "../hooks/queryTypes";

export const getCachedPodcasts = () => {
  const raw = localStorage.getItem(GET_TOP_PODCASTS);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > ONE_DAY) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

export const setCachedPodcasts = (data: any) => {
  const payload = { ts: Date.now(), data };
  localStorage.setItem(GET_TOP_PODCASTS, JSON.stringify(payload));
};

export const fetchTopPodcastsWithCache = async (fetchFn: () => Promise<any>) => {
  const cached = getCachedPodcasts();
  if (cached) return cached;
  const data = await fetchFn();
  setCachedPodcasts(data);
  return data;
};
