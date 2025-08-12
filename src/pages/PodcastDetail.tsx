import { useParams, Link } from "react-router-dom";
import type { PodcastDetail, Episode } from "../types/podcast";
import { useGetPodcastDetails, useGetPodcastEpisodes } from "../hooks/usePodcasts";

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { data: podcastDetailsData } = useGetPodcastDetails(podcastId || "");
  const { data: episodesData } = useGetPodcastEpisodes(podcastId || "");

  const podcast: PodcastDetail | undefined = podcastDetailsData?.results?.[0];
  const image: string | undefined = podcast?.artworkUrl600;
  const title: string | undefined = podcast?.collectionName || podcast?.trackName;
  const author: string | undefined = podcast?.artistName;
  const description: string = (podcast as any)?.description || podcast?.collectionName || "";

  const episodes: Episode[] = Array.isArray(episodesData?.results)
    ? episodesData.results.filter((ep: Episode) => ep.wrapperType === "podcastEpisode")
    : [];

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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-3 text-gray-500">
                    No se han encontrado episodios.
                  </td>
                </tr>
              )}
              {episodes.map((ep: Episode, idx: number) => (
                <tr key={ep.trackId} className={`border-b ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                  <td>
                    <Link
                      to={`/podcast/${podcastId}/episode/${encodeURIComponent(ep.trackId)}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ep.trackName}
                    </Link>
                  </td>
                  <td>{ep.releaseDate ? new Date(ep.releaseDate).toLocaleDateString() : ""}</td>
                  <td>
                    {ep.trackTimeMillis
                      ? `${Math.floor(ep.trackTimeMillis / 60000)}:${String(
                          Math.floor((ep.trackTimeMillis % 60000) / 1000),
                        ).padStart(2, "0")}`
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PodcastDetail;
