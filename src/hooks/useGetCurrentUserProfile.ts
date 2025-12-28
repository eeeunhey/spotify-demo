import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApis";

const useGetCurrentUserProfile = () => {
    const accessTokne = localStorage.getItem( "access_token")
    return useQuery ({
        queryKey:["current-user-profile"],
        queryFn:getCurrentUserProfile,
        enabled:!!accessTokne,
    });
}

export default useGetCurrentUserProfile;