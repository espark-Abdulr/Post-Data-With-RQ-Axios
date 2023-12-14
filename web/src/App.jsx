import { useState } from 'react'
import './App.css'
import axios from "axios"
import { useQuery, useMutation } from "react-query"

function App() {

  const [userData, setUserData] = useState({})


  const HandleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }))
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3100/users');
      return data;
    },
  });

  const Posrtdata = async () => {
    try {
      const response = await axios.post("http://localhost:3100/add", userData);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const { mutate, isError } = useMutation(Posrtdata, {
    onSuccess: (success) => {
      refetch()
    }
  })

  return (
    <>
      <h2>Hello World</h2>
      {isLoading ? <h2>Loading.....</h2> : <div>
        <h2>Length: {data.length}</h2>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder='Name' onChange={HandleChange} name='name' />
          <br /><br />
          <input type="number" placeholder='Age' onChange={HandleChange} name='age' />
          <br /><br />
          <button onClick={() => mutate(userData)}>Send</button>
        </form>


      </div>}
    </>
  )
}

export default App
