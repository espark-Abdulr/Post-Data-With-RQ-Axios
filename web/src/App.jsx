import './App.css'
import { Route, Routes } from 'react-router-dom';
import DetailsofUser from './DetailsofUser';
import Home from './Home';

function App() {


  return (
    <>
      <Routes>
        <Route path='/user-details/:userId' element={<DetailsofUser />} />
        <Route path='/' element={<Home />} />
      </Routes>
      
    </>
  )
}

export default App
