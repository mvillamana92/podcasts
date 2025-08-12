import { useQuery } from "@tanstack/react-query";
import { getPodcastDetails, getTopPodcasts } from "../api/service";
import { GET_PODCAST_DETAILS, GET_TOP_PODCASTS } from "./queryTypes";

export const useGetTopPodcasts = () => {
  return useQuery({
    queryKey: [GET_TOP_PODCASTS],
    queryFn: async () => await getTopPodcasts(),
  });
};

export const useGetPodcastDetails = (podcastId) => {
  return useQuery({
    queryKey: [GET_PODCAST_DETAILS, podcastId],
    queryFn: async () => await getPodcastDetails(podcastId),
  });
};
