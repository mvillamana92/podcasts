import { Link } from "react-router-dom";
import { PodcastItem } from "../types/podcast";

type Props = { item: PodcastItem };

const PodcastCard = ({ item }: Props) => {
  const id = item.id?.attributes?.["im:id"];
  const title = item["im:name"]?.label;
  const author = item["im:artist"]?.label;
  const img = item["im:image"]?.[2]?.label;

  return (
    <Link
      to={`/podcast/${encodeURIComponent(id)}`}
      className="block p-6 bg-white rounded shadow-sm hover:shadow-md text-center"
    >
      <img
        src={img}
        alt={title}
        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border border-gray-200 shadow"
      />
      <div className="font-semibold text-base mb-2">{title?.toUpperCase()}</div>
      <div className="text-xs text-gray-500">
        <span className="font-semibold">Author:</span> {author}
      </div>
    </Link>
  );
};

export default PodcastCard;
