import { axiosInstance } from "./axios";

export const getWordOfTheDay = async ()=>{
    const response = await axiosInstance.get('/today');
    return response.data;
};

export const addWord = async (data)=>{
     const response = await axiosInstance.post('/word', data);
     console.log(response);
     return response;
}