import axios from "axios"
import { useMutation, useQuery } from "react-query"
import uniqid from 'uniqid';


const FetchData = () => {
  return axios.get("http://localhost:3100/users")
}

const AddUser = async (user) => {
  if (user.name === "" || user.age === "" || user.email === "") {
    alert("Please Add Data")
    return
  }
  const userId = uniqid()

  return await axios.post("http://localhost:3100/add", {
    ...user,
    id: userId
  })
}


export const useUsersData = () => {
  return useQuery("users", FetchData)
}

export const addUsersData = (onSuccess) => {
  return useMutation(AddUser, {
    onSuccess:(data)=>{
      onSuccess(data?.data?.message)
    }
  })
}
