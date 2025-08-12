import { useParams, Link } from "react-router-dom";
import type { PodcastDetail, Episode } from "../types/podcast";
import { useGetPodcastDetails, useGetPodcastEpisodes } from "../hooks/usePodcasts";

const EpisodeDetail = () => {
  const { podcastId, episodeId } = useParams();
  const { data: podcastDetailsData } = useGetPodcastDetails(podcastId || "");
  const { data: episodesData } = useGetPodcastEpisodes(podcastId || "");

  const podcast: PodcastDetail | undefined = podcastDetailsData?.results?.[0];
  const image: string | undefined = podcast?.artworkUrl600;
  const title: string | undefined = podcast?.collectionName || podcast?.trackName;
  const author: string | undefined = podcast?.artistName;

  const episodes: Episode[] = Array.isArray(episodesData?.results)
    ? episodesData.results.filter((ep: Episode) => ep.wrapperType === "podcastEpisode")
    : [];
  const episode: Episode | undefined = episodes.find((ep: Episode) => ep.trackId?.toString() === episodeId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <div className="bg-white p-4 rounded shadow">
          <Link to={`/podcast/${podcastId}`} className="block">
            {image && <img src={image} alt={title} className="w-full rounded mb-3" />}
            <h3 className="font-bold mb-1 hover:underline">{title}</h3>
            <p className="text-sm text-gray-600 mb-2 hover:underline">{author}</p>
          </Link>
        </div>
      </aside>
      <section className="md:col-span-3">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{episode?.trackName}</h2>
          <div
            className="prose my-4"
            dangerouslySetInnerHTML={{ __html: episode?.description || episode?.shortDescription || "" }}
          />
          {episode?.episodeUrl || episode?.previewUrl ? (
            <audio controls src={episode.episodeUrl || episode.previewUrl} className="w-full mt-4" />
          ) : (
            <div className="text-sm text-gray-500 mt-4">No hay audio disponible para este episodio.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EpisodeDetail;
