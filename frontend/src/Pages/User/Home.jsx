import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Posts from '../../Components/Posts';
import { baseUrl, user,  mypost, recommended } from '../../utils/Constants';

import axiosInstance from '../../utils/axiosInstance';
import './loader.css';
import {Loader} from 'rsuite';

const Home = ({ googleuser }) => {
  const [userName, setUserName] = useState(null);
  const [userposts, setUserposts] = useState([]);
  const [recommendedposts, setRecomposts] = useState([]);


  useEffect(() => {


    const fetchData = async () => {
      try {


        const response = await axiosInstance.get(baseUrl + user);
        const postresponse = await axiosInstance.get(baseUrl + mypost);
        const recommendedResponse = await axiosInstance.get(baseUrl + recommended);

        console.log('Response:', response.data);
        console.log('PostResponse:', postresponse.data);
        console.log('Recommended Posts:', recommendedResponse.data);


        setUserName(response.data);
        setUserposts(postresponse.data);
        setRecomposts(recommendedResponse.data);


      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      {userName && userposts ? (
        <>
          <div className='home'>
            <Navbar username={userName.username} pic={userName.profile_pic} />
            <div className='flex flex-row'>
              <SideBar></SideBar>
              <Posts username={userName} posts={recommendedposts} pic={userName.profile_pic}  isMypost={true}/>
        
            </div>
          </div>
        </>
      ) : (
        // Loading state or alternative content
        <div>
          <Loader center content="loading" size='lg' />
        </div>
      )}

    </>



  );
}

export default Home;




