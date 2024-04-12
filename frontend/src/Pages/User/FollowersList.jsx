import React, { useEffect, useState } from 'react';
import { baseUrl, user, mypost, recommended } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../../Components/NavBar';
import { Loader, Placeholder } from 'rsuite';
import './loader.css'
import SideBar from '../../Components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Followings.css'
import FollowUnfollowApi from '../../api/FollowUnFollowApi';


const FollowersListPage = () => {
  
    const [following, setFollowing] = useState([]);
    const navigate = useNavigate()
    const [userName, setUserName] = useState(null);
    const [userposts, setUserposts] = useState([]);
    const [recommendedposts, setRecomposts] = useState([]);
  
    useEffect(() => {
    
      
      const fetchData = async () => {
        try {
        
         
          const response = await axiosInstance.get(baseUrl + user);
          const postresponse = await axiosInstance.get(baseUrl + mypost);
          const recommendedResponse = await axiosInstance.get(baseUrl + recommended);
  
          const userdata = response.data
  
          setUserName(response.data);
          setUserposts(postresponse.data);
          setRecomposts(recommendedResponse.data);
  
          if(userdata){
            
            axiosInstance
            .get(`${baseUrl}posts/followers/${userdata.id}/`)
            .then((response) => {
              if(response.data.length>0){
              setFollowing(response.data);
              }
              else{
                console.log("no followings")
              }
            })
            .catch((error) => {
              console.error('Error fetching following:', error);
            });
          }
          else{
            console.log("error getting user data")
          }
  
  
        } catch (error) {
          console.error('Error:', error);
        }      
      };
    
      fetchData();
    }, []);
  
  
     
    // Filter following based on search query
    const filteredFollowing = following.filter((followingUser) =>
      followingUser.follower.username.toLowerCase()
    );
  
    const [userfollow,setuserfollow] = useState({})
  const handleFollowUnfollow = async (userId) => {
    try {
      const followresponse =await FollowUnfollowApi(userId);
     
        const updatedFollowState = {
          ...userfollow,
          [userId]: {
            follow: followresponse.detail === 'You are now following this user.',
            
          },
        };
       
      setuserfollow(updatedFollowState)
      
    } catch(e){
      console.log(e)
      console.log("follow/unfollow got error");
    }
  };
  


    return (
        <>
            {userName && userposts ? (
                <>
                    <div className='home'>
                        <Navbar username={userName.username} pic={userName.profile_pic} />
                        <div className='flex flex-row'>
                            <SideBar></SideBar>



                            <div>
                                {filteredFollowing.length > 0 ?
                                    (<>
                                        <h2 className="mt-4 text-white" style={{ marginLeft: '25%' }}>Followers</h2>
                                        <div className='div-table-followings'>

                                            <table className="border-collapse bg-slate-500 shadow-md table-followings" style={{ width: '70%' }}>
                                                <tbody>
                                                    {filteredFollowing.map((followingUser) => (
                                                        <tr key={followingUser.id}>
                                                            <td style={{ paddingLeft: '100px', paddingRight: '10px', width: '80px' }} className='py-4'>
                                                                {followingUser.follower.profile_pic ? (
                                                                    <img
                                                                        src={followingUser.follower.profile_pic}
                                                                        alt={`${followingUser.follower.username}'s profile`}
                                                                        style={{ width: '39px', height: '39px', borderRadius: '50%' }}
                                                                    //onClick={() => navigateToAuthorProfile(followingUser.following.id)}
                                                                    />
                                                                ) : (
                                                                    <FontAwesomeIcon
                                                                        icon={faUser}
                                                                        style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '50%',
                                                                            border: '1px solid black',
                                                                            padding: '5px',
                                                                        }}
                                                                    />
                                                                )}
                                                            </td>
                                                            <div>
                                                            <td className="py-4 text-white" onClick={() => (followingUser.following.id)}>
                                                                {followingUser.follower.username}
                                                            </td>
                                                            <td className="py-4"
                                                                style={{ paddingLeft: '300px' }}> {/* Increase paddingRight */}
                                                                <button type='button' className='absolute'
                                                                    onClick={() => {
                                                                        handleFollowUnfollow(followingUser.follower.id)
                                                                    }}
                                                                    style={{
                            
                                                                        backgroundColor:'white',border:'2px solid black',borderRadius:'10px',padding:'auto'}}
                                                                    onMouseOver={(e)=>{e.currentTarget.style.backgroundColor='#D15A5A';e.currentTarget.style.color='black'}}
                                                                    onMouseOut={(e)=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=userfollow[followingUser.follower.id]?.follow ? "#D15A5A" : "blue"}}
                                                                >
                                                                     { userfollow[followingUser.follower.id]?.follow ?  'UnFollow' : 'Follow Back'}
                                                                </button>
                                                            </td>
                                                            </div>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>) :
                                    (<h2 className="mt-4 text-white" style={{ marginLeft: '45%', marginTop: '15%' }}>No Followers </h2>)}
                            </div>
                        </div>
                    </div >
                </>
            ) : (
                // Loading state or alternative content
                <div>
                    <Loader center content="loading" size='lg' />
                </div>
            )}

        </>



    );
};

export default FollowersListPage;
