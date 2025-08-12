import { useMemo, useState } from "react";
import { useGetTopPodcasts } from "../hooks/usePodcasts";
import PodcastCard from "../components/PodcastCard";

const Home = () => {
  const { data, isLoading } = useGetTopPodcasts();

  const topPodcasts = data?.feed?.entry || [];

  console.log(topPodcasts);

  const [querySearch, setQuerySearch] = useState("");

  const filteredPodcasts = useMemo(() => {
    const text = querySearch.toLowerCase();
    return topPodcasts.filter((it: any) => {
      const title = (it["im:name"]?.label || it.title || "").toLowerCase();
      const author = (it["im:artist"]?.label || it.artistName || "").toLowerCase();
      return title.includes(text) || author.includes(text);
    });
  }, [topPodcasts, querySearch]);

  return (
    <div className="px-8 py-6">
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">{filteredPodcasts?.length}</span>
          <input
            type="text"
            placeholder="Filter podcasts..."
            value={querySearch}
            onChange={(e) => setQuerySearch(e.target.value)}
            className="border rounded px-3 py-1"
          />
        </div>
      </div>
      {isLoading && <p>Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPodcasts.map((item: any) => (
          <PodcastCard key={item.id?.attributes?.["im:id"] || item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
