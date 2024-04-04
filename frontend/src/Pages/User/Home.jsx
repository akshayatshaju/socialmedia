import React from 'react';
import Navbar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import CardPost from '../../Components/CardPost';

const Home = () => {

    return (
      <div className='home'>
          <Navbar></Navbar>
          <div className='flex flex-row'>
            <SideBar></SideBar>
            <CardPost/>
          </div>
          
        
      </div>
    );
  }
  
  export default Home;