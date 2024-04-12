import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/User/Login';
import SignUp from '../Pages/User/SignUp';
import Home from '../Pages/User/Home';
import FollowingListPage from '../Pages/User/FollowingsList';
import MyPosts from '../Pages/User/MyPosts';
import Profile from '../Pages/User/Profilepage';
import FollowersList from '../Pages/User/FollowersList';




const UserRouter = () => {
    return (
    
          <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/Home' element={<Home/>}/>

          <Route element={<Profile/>} path="/profile"/>

          <Route path='/myposts' element={<MyPosts/>} />

          <Route element={<FollowingListPage/>} path="/followings"/>
          <Route element={<FollowersList/>} path="/followers"/>

          
  
    
  
          </Routes>
     
      );
  
     
  }
  
  export default UserRouter;