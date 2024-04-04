import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/User/Login';
import SignUp from '../Pages/User/SignUp';
import Home from '../Pages/User/Home';



const UserRouter = () => {
    return (
    
          <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/Home' element={<Home/>}/>
  
    
  
          </Routes>
     
      );
  
     
  }
  
  export default UserRouter;