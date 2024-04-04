import AdminNav from "../../Components/AdminNav";
import AdminSide from "../../Components/AdminSide";
import UserList from "./UserList";
import React, { useEffect, useState } from 'react';
import { baseUrl,registeredUsers } from "../../utils/Constants";
import axiosInstanceAdmin from "../../utils/axiosInstanceAdmin";
//import { useNavigate } from "react-router-dom";

//import axiosInstanceAdmin from "../../utils/axiosInstanceAdmin";


function AdminDash(){

    const [users,setUsers] = useState([])
    const [error] = useState(null);
    //const [isLoading, setIsLoading] = useState(true); // New loading state
    //const navigate = useNavigate()

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
      
   
   
    return(
        <div>
            
            <AdminNav/>
            <div className= 'flex justify-start'>
            <AdminSide/>
            {error ? (
                <div className="error-message">
                    Something went wrong while fetching user details.
                </div>
            ) : (
                <UserList users={users} />
            )}

        </div>
        </div>
    )
}


export default AdminDash;