import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import type { GetCurrentUserPlaylistRequest } from "../models/playlist";

//useInfiniteQuery 가 무한 스크롤을 가능하게 한다

const useGetCurrentUserPlaylists = ({
  limit
}: GetCurrentUserPlaylistRequest) => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({pageParam = 0}) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam:0,
    getNextPageParam:(lastPage)=>{
        if(lastPage.next) {
            const url = new URL(lastPage.next)
            const nextOffset = url.searchParams.get("offset")
            return nextOffset ? parseInt(nextOffset): undefined
        }
        return undefined;
    }
  });
};





// const useGetCurrentUserPlaylists = ({
//   limit,
//   offset,
// }: GetCurrentUserPlaylistRequest) => {
//   return useQuery({
//     queryKey: ["current-user-playlists"],
//     queryFn: () => {
//       return getCurrentUserPlaylists({ limit, offset });
//     },
//   });
// };

export default useGetCurrentUserPlaylists;
