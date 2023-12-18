import React from 'react';
import { queryingDetails } from './hooks/useUserDetails';
import {useParams} from "react-router-dom"

const DetailsofUser = () => {
  const {userId} = useParams()


  const { data, isLoading, isError, error } = queryingDetails(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log()

  if (isError) {
    return <div>{error?.response?.data?.error}</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {data?.data?.name}</p>
      <p>User ID: {data?.data?.id}</p>
      <p>User Age: {data?.data?.age}</p>
      <p>Email: {data?.data?.email}</p>
    </div>
  );
};

export default DetailsofUser;
