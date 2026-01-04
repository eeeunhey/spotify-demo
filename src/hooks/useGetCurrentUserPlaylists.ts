import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import type { GetCurrentUserPlaylistRequest } from "../models/playlist";
import useClientCredentialToken from "./useClientCredentialToken";

//useInfiniteQuery 가 무한 스크롤을 가능하게 한다

type Params = GetCurrentUserPlaylistRequest & {
  enabled?: boolean;
};

const useGetCurrentUserPlaylists = ({ limit = 15, enabled = true }: Params = {}) => {
  const token = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["current-user-playlists", limit],
    enabled: enabled && !!token,
    queryFn: ({ pageParam = 0 }) => getCurrentUserPlaylists({ limit, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      const nextOffset = new URL(lastPage.next).searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset, 10) : undefined;
    },
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
