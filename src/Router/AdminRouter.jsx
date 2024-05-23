import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/AdminLogin';
import AdminDash from '../Pages/Admin/AdminDash';
import BarChart from '../Pages/Admin/BarChart';
import UserDetail from '../Pages/Admin/UserDetail';
import AdminUserPosts from '../Pages/Admin/AdminUserPosts';
import AdminUserPostsDetails from '../Pages/Admin/AdminUserPostDetails';
import AdminPosts from '../Pages/Admin/AdminPosts';
import Yearchart from '../Pages/Admin/Yearchart';





function AdminRouter() {
  return (
    <Routes>
        
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/AdminDash' element={<AdminDash/>}/>
        <Route path='/admin_user/:userEmail' element={<UserDetail/>}/>
        <Route path='/chart' element={<BarChart/>}/>
        <Route path='/yearchart' element={<Yearchart/>}/>
        <Route path='/admin_user_posts/:userEmail' element={<AdminUserPosts/>}/>
        <Route path='/admin_user_posts_details/:id' element={<AdminUserPostsDetails/>}/>
        <Route path='/posts' element={<AdminPosts/>}/>
        
        

    </Routes>
   
  )
}

export default AdminRouter
