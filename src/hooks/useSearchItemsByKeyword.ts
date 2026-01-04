// import { useInfiniteQuery } from "@tanstack/react-query";
// import searchItemsByKeyword from "../apis/searchApi";
// import type { SearchRequestParams } from "../models/search";
// import useClientCredentialToken from "./useClientCredentialToken";

// const useSearchItemsByKeyword = (params: SearchRequestParams) => {
//   const clientCredentialToken = useClientCredentialToken();
//   return useInfiniteQuery({
//     queryKey: ["search", params],
//     queryFn: ({ pageParam = 0 }) => {
//       if (!clientCredentialToken) throw new Error(" No Token available ");
//         return searchItemsByKeyword(clientCredentialToken, params);
//       },
//     },
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => {
//         const nextPageUrl = lastPage.track?.next || lastPage.artists?next || lastPage.albums?.next || 
//         lastPage.playlists?.next || lastPage.shows?.next || lastPage.eposodes?.next || lastPage.audiobooks?.next;
    
//         if (nextPageUrl) {
//             const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
//             return nextOffset ? parseInt(nextOffset) : undefined;
//         }
    
//     }
//     retrun undefined;
//   });
// };
