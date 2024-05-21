import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Posts from '../../Components/Posts';
import {  baseUrl,user } from '../../utils/Constants';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser ,faHeart,faBookmark,faShare, faTrash} from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../utils/axiosInstance';
// import { Link ,useParams} from 'react-router-dom';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSavedPosts = () => {
  //const [postlike, setLike] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState([]);


  useEffect(() => {


    const fetchData = async () => {
      try {


        const postresponse = await axiosInstance.get(`${baseUrl}posts/usersavedpost`);
        const response = await axiosInstance.get(baseUrl + user);

        console.log('PostResponse:', postresponse.data);
        console.log('Response:', response.data);



        setPosts(postresponse.data);
        setUserName(response.data);


      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  console.log(sortedPosts,"posts")



  return (
   
      
        <>
          <div className='home'>
            <Navbar username={userName?userName.username:""} pic={userName?userName.profile_pic:""} />
            <div className='flex flex-row'>
              <SideBar pic={userName?userName.profile_pic:""}/>
            {posts.length>0?
              <Posts  username={userName?userName:""} posts={sortedPosts} pic={userName?userName.profile_pic:""} isMypost={false}/>
              :<h2 style={{marginLeft:'20%',marginTop:'15%', color: 'white'}}>No Saved Posts</h2>
  }
        
            </div>
          </div>
        </>
     
   



  );
}

export default UserSavedPosts;




