import React from 'react'
import"./index.css"
import { Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import UserPage from './UserPage';
import Sign from './Sign';
import Home from './Home';


function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' Component={Home} ></Route>
      <Route exact path='/signup' Component={SignUp} ></Route>
      <Route exact path='/login' Component={Sign} ></Route>
      <Route exact path='/postlist' Component={UserPage}/>
    </Routes>
   {/* <Sign/> */}
    </>
  )
}

export default App
