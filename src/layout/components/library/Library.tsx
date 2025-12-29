import  { useEffect } from "react";
import { styled } from "@mui/material";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../LodingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { EmptyPlaylist } from "../EmptyPlaylist";
import Playlist from "../../Playlist";



const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": { display: "none" },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetCurrentUserPlaylists({ limit: 15 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const isEmpty = !data || data.pages[0].items.length === 0;

  if (isEmpty) return <EmptyPlaylist />;

  return (
    <PlaylistContainer>
      {data.pages.map((page, index) => (
        <Playlist key={index} playlists={page.items} />
      ))}

      <div ref={ref} style={{ height: "20px" }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </PlaylistContainer>
  );
};

export default Library;