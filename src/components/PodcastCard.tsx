import { Link } from "react-router-dom";
import { PodcastItem } from "../types/podcast";

type Props = { item: PodcastItem };

const PodcastCard = ({ item }: Props) => {
  const id = item.id?.attributes?.["im:id"];
  const title = item["im:name"]?.label;
  const author = item["im:artist"]?.label;
  const img = item["im:image"]?.[2]?.label;

  return (
    <Link to={`/podcast/${encodeURIComponent(id)}`} className="block p-3 bg-white rounded shadow-sm hover:shadow-md">
      <div className="flex gap-3 items-center">
        <img src={img} alt={title} className="w-16 h-16 object-cover rounded" />
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs text-gray-500">{author}</div>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;
