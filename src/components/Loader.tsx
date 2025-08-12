import { useIsFetching } from "@tanstack/react-query";

const Loader = () => {
  const isFetching = useIsFetching();
  return (
    <div className="h-6 w-6">
      {isFetching ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent" />
      ) : null}
    </div>
  );
};

export default Loader;
