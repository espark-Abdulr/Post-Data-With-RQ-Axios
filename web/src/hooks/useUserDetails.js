import axios from "axios";
import { useQuery } from "react-query";

// const userId = window.location.pathname.split("/")[2];

const FetchDetails = async (userId) => {
    return await axios.get(`http://localhost:3100/userDetail/${userId}`)    
};


export const queryingDetails = (userId) => {
    return useQuery(["details", userId], () => FetchDetails(userId))
}