import AdminNav from "../../Components/AdminNav";
import AdminSide from "../../Components/AdminSide";
import UserList from "./UserList";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, registeredUsers, refresh } from "../../utils/Constants";
import axiosInstanceAdmin, {checkAuthentication} from "../../utils/axiosInstanceAdmin";
import { useNavigate,Link } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

function AdminPosts(){

    const [users,setUsers] = useState([])
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            
            console.log('Making request...');
            const response = await axiosInstanceAdmin.get(baseUrl+registeredUsers)
          

            console.log('Response:', response.data);
      
            setUsers(response.data);
          } catch (error) {
            console.error('Error:', error);
      
          }
        };
      
        fetchData();
      }, []);
      const filteredusers = users.filter((user)=>!user.is_deleted)


      return(
        <div className="admin">
            
            <AdminNav/>
            <div className= 'flex justify-start'>
            <AdminSide/>
            {error ? (
                <div className="error-message">
                    Something went wrong while fetching user details.
                </div>
            ) : (
              <div className="flex justify-center items-center w-full">
        <div className="w-full md:w-2/3">
            <Card className="h-screen w-10/12 overflow-scroll bg-slate-300">
              
              <h2 className='text-red-500 p-4'>User List</h2>
              <div class="flex">
              <div class="text-black text-lg ml-1/4 mt-5">
                  <h2 class="text-2xl"></h2>
              </div>
          
              <table class="table-auto ml-1/3 mt-2">
                  <thead>
                      <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-500 p-4">
                                <Typography
                                    variant="large"
                                    color="white"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Users
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-700 p-4">
                                <Typography
                                    variant="large"
                                    color="white"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-500 p-4 w-[400px]">
                                <Typography
                                    variant="large"
                                    color="white"
                                    className="font-normal leading-none opacity-70"
                                >
                                    UserName
                                </Typography>
                            </th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredusers.map((user, index) => (
                            <tr key={user.id} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                              <td className="p-4">{index + 1}</td>
                                <td className="p-4">
                                  {user.is_deleted ? (
                                      <span class="text-black">{user.email}</span>
                                  ) : (
                                      <a href={`/admin/admin_user_posts/${user.email}`} className="text-black  hover:scale-110 transition-transform "  style={{ textDecoration: 'none',fontWeight: 'bold', fontSize: '18px' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                                          {user.email}
                                      </a>
                                  )}
                              </td>
                              <td className="p-4">
                                  {user.is_deleted ? (
                                      <span class="text-black">{user.username}</span>
                                  ) : (
                                      <a  className="text-black  hover:scale-110 transition-transform"  style={{ textDecoration: 'none' ,fontWeight: 'bold', fontSize: '18px'}} onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                                          {user.username}
                                      </a>
                                  )}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          </Card>
          </div>
        </div>
          
            )}

        </div>
        </div>
    )
   
   
}


export default AdminPosts;