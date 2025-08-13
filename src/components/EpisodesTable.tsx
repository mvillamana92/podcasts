import { Link } from "react-router-dom";
import type { Episode } from "../types/podcast";

interface EpisodesTableProps {
  episodes: Episode[];
  podcastId?: string;
}

const EpisodesTable = ({ episodes, podcastId }: EpisodesTableProps) => (
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
      {episodes.map((ep, idx) => (
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
);

export default EpisodesTable;
