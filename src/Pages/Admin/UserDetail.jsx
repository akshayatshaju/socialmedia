import AdminSide from '../../Components/AdminSide';
import AdminNav from '../../Components/AdminNav';
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { baseUrl,userdetail,blockuser, base} from '../../utils/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstanceAdmin   from '../../utils/axiosInstanceAdmin';




function UserDetail(props){
    

    //const navigate = useNavigate()
    const [users,setUsers] = useState([])
    // const [userdeleted,setUserdeleted] = useState(false)
    const [userblocked,setUserblocked] = useState(false)

   

   console.log(userblocked,"user blocked or not")
    

    const {userEmail} = useParams()
    console.log(userEmail,"got user email")



    useEffect(() => {
        axiosInstanceAdmin.get(`${baseUrl}${userdetail}/${userEmail}`)
        .then(response => {
          setUsers(response.data);
          console.log(response.data, "inside userdetail")
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);

        });
    }, [userEmail]);
  
   console.log(users.is_active,"user blocked or nott")

 
    

  
      console.log("users:", users); // Add this line to debug
      console.log("users.id:", users.id);

    //   handle block button clicking event
    const handleBlockUser = async (id) => {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${baseUrl}${blockuser}/${id}/`;
          // Send data to indicate the change in is_active status
          const data = {
            is_active: !users.is_active,
          };
    
          axiosInstanceAdmin
            .patch(url, data)
            .then((res) => {
              console.log("success");
              setUserblocked(!userblocked);
    
              // Update the state based on the new value of is_active
              setUsers((prevUsers) => ({
                ...prevUsers,
                is_active: !prevUsers.is_active,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    };
    return(
        <div className='admin'>
            <AdminNav/>
            <div className= 'flex justify-start'>
            <AdminSide/>
            
            <div className="details_box rounded-lg" style={{
                
                marginLeft:'200px',
                marginTop:'90px',
                width:'50%',
                height:'500px',
                overflowX: 'auto',
                backgroundColor: 'ButtonShadow'
                
            }}>
             <div className='user_profile p-2'>
                {users.profile_pic?<img src={base + users.profile_pic} alt="profile" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                   marginRight:'20px'
                   
                }} />:<img  alt="default profile" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                   marginRight:'20px'
                
                }} />}
                <span style={{fontSize:'30px', fontWeight:'700',paddingTop:'100px', color: 'chocolate'}}>{users.username}</span>
                {/* <Link to={`/admin/admin_user_posts/${users.email}`} style={{fontSize:'18px', fontWeight:'600',paddingTop:'5px',marginLeft:'70%',border:'2px solid black',color:'blue'}} className="btn">User Posts</Link> */}

            </div>

            <ul style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'40px',
                fontSize:'20px',
                fontWeight:'400',
               
                
            }}>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center',}}>
            <span style={{ width: '150px', marginRight: '10px' ,fontWeight: 'bold'}}>Username</span>
            <span style={{ marginRight: '10px' }}>: </span>
            <span style={{color: '#00008B'}}>{users.username}</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', marginRight: '10px',fontWeight: 'bold' }}>ID</span>
            <span style={{ marginRight: '10px' }}>: </span>
            <span style={{color: '#00008B'}}>{users.id}</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', marginRight: '10px' ,fontWeight: 'bold'}}>Email</span>
            <span style={{ marginRight: '10px' }}>: </span>
            <span style={{color: '#00008B'}}>{users.email}</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', marginRight: '10px',fontWeight: 'bold' }}>Phone</span>
            <span style={{ marginRight: '10px' }}>: </span>
            <span style={{color: '#00008B'}}>{users.phone}</span>
            </li>
          
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', marginRight: '10px',fontWeight: 'bold' }}>Last Login</span>
            <span style={{ marginRight: '10px'}}>: </span>
            <span style={{color: '#00008B'}}>{users.last_login}</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', marginRight: '10px',fontWeight: 'bold' }}>is active</span>
              <span style={{ marginRight: '10px' }}>: </span>
              <input type='checkbox' checked={users.is_active} readOnly />
            </li>

        
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', marginRight: '10px',fontWeight: 'bold' }}>is superuser</span>
            <span style={{ marginRight: '10px'}}>: </span>
            <input type='checkbox' checked={users.is_superuser}/>
            



            </li>
            </ul>

         
            <button style={{
                backgroundColor:'grey',
                border:'5px solid #808080',
                width:'100px',
                borderRadius:'5px',
                marginLeft: '50px'
                
                
                }}
                onClick={() => handleBlockUser(users.id)}>{users.is_active ? "Block" : "Unblock"}</button>
             </div>
            </div>
          

        </div>
    )
}


export default UserDetail;
