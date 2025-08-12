import { useQuery } from "@tanstack/react-query";
import { getPodcastDetails, getPodcastEpisodes, getTopPodcasts } from "../api/service";
import { fetchTopPodcastsWithCache } from "../utils/podcastCache";
import { GET_PODCAST_DETAILS, GET_PODCAST_EPISODES, GET_TOP_PODCASTS } from "./queryTypes";

export const useGetTopPodcasts = () => {
  return useQuery({
    queryKey: [GET_TOP_PODCASTS],
    queryFn: async () => await fetchTopPodcastsWithCache(getTopPodcasts),
  });
};

export const useGetPodcastDetails = (podcastId) => {
  return useQuery({
    queryKey: [GET_PODCAST_DETAILS, podcastId],
    queryFn: async () => await getPodcastDetails(podcastId),
    enabled: !!podcastId,
  });
};

export const useGetPodcastEpisodes = (podcastId: string, limit: number = 9) => {
  return useQuery({
    queryKey: [GET_PODCAST_EPISODES, podcastId, limit],
    queryFn: async () => await getPodcastEpisodes(podcastId, limit),
    enabled: !!podcastId,
  });
};
