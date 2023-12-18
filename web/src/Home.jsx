import React, { useState } from 'react'
import { addUsersData, useUsersData } from './hooks/useUserData';
import { Link } from 'react-router-dom';


const Home = () => {
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        age: "",
    })


    const HandleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }))
    }


    const { data, isLoading: queryLoading, refetch, isError: isQueryError, error: QueryErrMsg } = useUsersData();



    const onSuccess = (message) => {
        setUserData({
            email: "",
            name: "",
            age: "",
        })
        message && alert(message)
        refetch()
    }


    const { mutate, isError: isUseMutationError, error: useMutationErrorMsg, isLoading: mutationLoading } = addUsersData(onSuccess)


    const AddHandler = (event) => {
        event.preventDefault();
        mutate(userData)
    }


    if (isUseMutationError || isQueryError) {
        return <h1>{isUseMutationError ? useMutationErrorMsg?.message : QueryErrMsg.message}</h1>
    }
    return (
        <div>
            {queryLoading || mutationLoading ? <h2>Loading.....</h2> : <form action="" onSubmit={AddHandler}>
                <input type="email" placeholder='Email' value={userData?.email} onChange={HandleChange} name='email' />
                <br /><br />
                <input type="text" placeholder='Name' value={userData?.name} onChange={HandleChange} name='name' />
                <br /><br />
                <input type="number" placeholder='Age' value={userData?.age} onChange={HandleChange} name='age' />
                <br /><br />
                <button type='submit'>Send</button>
                {data?.data?.map((eachUser, index) => (
                    <Link to={`/user-details/${eachUser?.id}`} key={index}>
                        <h2>{eachUser?.name}</h2>
                    </Link>
                ))}
            </form>}

        </div>
    )
}

export default Home
