import { axiosInstance } from "./axios";

export const getWordOfTheDay = async ()=>{
    const response = await axiosInstance.get('/today');
    return response.data;
};