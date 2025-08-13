import { useParams } from "react-router-dom";
import type { PodcastDetail, Episode } from "../types/podcast";
import { useGetPodcastDetails, useGetPodcastEpisodes } from "../hooks/usePodcasts";
import EpisodesTable from "../components/EpisodesTable";
import Loader from "../components/Loader";

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { data: podcastDetailsData, isLoading: isLoadingDetails } = useGetPodcastDetails(podcastId || "");
  const { data: episodesData, isLoading: isLoadingEpisodes } = useGetPodcastEpisodes(podcastId || "");

  const podcast: PodcastDetail | undefined = podcastDetailsData?.results?.[0];
  const image: string | undefined = podcast?.artworkUrl600;
  const title: string | undefined = podcast?.collectionName || podcast?.trackName;
  const author: string | undefined = podcast?.artistName;
  const description: string = (podcast as any)?.description || podcast?.collectionName || "";

  const episodes: Episode[] = Array.isArray(episodesData?.results)
    ? episodesData.results.filter((ep: Episode) => ep.wrapperType === "podcastEpisode")
    : [];

  if (isLoadingDetails || isLoadingEpisodes) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <div className="bg-white p-4 rounded shadow">
          {image && <img src={image} alt={title} className="w-full rounded mb-3" />}
          <h3 className="font-bold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{author}</p>
          <div className="text-xs text-gray-500 whitespace-pre-line">{description}</div>
        </div>
      </aside>
      <section className="md:col-span-3">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Episodes: {episodes.length}</h2>
          <EpisodesTable episodes={episodes} podcastId={podcastId} />
        </div>
      </section>
    </div>
  );
};

export default PodcastDetail;
