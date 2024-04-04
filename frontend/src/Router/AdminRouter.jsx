import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/AdminLogin';
import AdminDash from '../Pages/Admin/AdminDash';
import BarChart from '../Pages/Admin/BarChart';
import UserDetail from '../Pages/Admin/UserDetail';



function AdminRouter() {
  return (
    <Routes>
        
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/AdminDash' element={<AdminDash/>}/>
        <Route path='/admin_user/:userEmail' element={<UserDetail/>}/>
        <Route path='/chart' element={<BarChart/>}/>
        
        
        

    </Routes>
   
  )
}

export default AdminRouter
