// import { useInfiniteQuery } from "@tanstack/react-query"
// import searchItemsByKeyword from "../apis/searchApi"

// const useSearchItemsByKeyword=(params:)=>{
//     return useInfiniteQuery({
//         queryKey:["search", params],
//         queryFn:({pageParam = 0})=>{
//             return searchItemsByKeyword(params)
//         },
//         initialPageParam:0,
//         getNextPageParam:(lastPage)=>{

//         },

//     })
// }