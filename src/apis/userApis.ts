
import type { User } from "../models/User";
import api from "../utils/api";


export const getCurrentUserProfile = async():Promise<User> => {
    try{
        const response = await api.get(`/me`)
        return response.data
    } catch(error) {
        throw new Error("fail to fetch user profile")
    }

}