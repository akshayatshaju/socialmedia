import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { baseUrl } from '../../utils/Constants';
import { Loader } from 'rsuite';
import Navbar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`${baseUrl}posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`${baseUrl}api/user`); // Adjust the endpoint as needed
        setUserName(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchPost();
    fetchUser();
  }, [postId]);

  if (!post || !userName) {
    return (
      <div>
        <Loader center content="loading" size='lg' />
      </div>
    );
  }

  return (
    <div className='home'>
      <Navbar username={userName.username} pic={userName.profile_pic} />
      <div className='flex flex-row'>
        <SideBar />
        <div className='post-detail'>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          {/* Render other post details here */}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

