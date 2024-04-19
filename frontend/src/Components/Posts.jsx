import React, { useState, navigate, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { baseUrl, createpost, user, mypost, recommended, like, deletepost } from '../utils/Constants';
import { faUser, faHeart, faBookmark, faShare, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FollowUnfollowApi from '../api/FollowUnFollowApi';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

function Posts({ username, posts, pic, isMypost }) {
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [Images, setImages] = useState([]);
  const [showNotification, setShowNotification] = useState(false);





  const [trigger, setTrigger] = useState(false);
  console.log(posts)
  const [userposts, setUserPosts] = useState(posts ? posts : "null")
  const navigate = useNavigate()
  useEffect(() => {
    setUserPosts(posts ? posts : "null")
    console.log("user posts updated", userposts)


  }, [posts])



  const handlePostClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  // time setting
  function calculateTimeAgo(created_at) {
    const createdAtDate = new Date(created_at);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes
    const hoursAgo = Math.floor(minutesAgo / 60); // Convert minutes to hours
    const daysAgo = Math.floor(hoursAgo / 24); // Convert hours to days

    if (daysAgo > 0) {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
  }



  //post submitt

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('hashtag', hashtag);
      formData.append('Images', Images);
      console.log(formData, "formdata")

      //send data to backend using axios
      const response = await axiosInstance.post(baseUrl + createpost, formData);

      //check if the post was successfully created
      if (response.status === 201) {
        setShowModal(false);
        setCaption('');
        setHashtag('');
        setImages([]);
        console.log('Post created Successfully:', response.data);




        //replace with actual route for my post

      } else {
        console.error('failed to create post:', response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setShowNotification(true);
  };


  // notification handling close button
  const handleCloseNotification = () => {
    // Close the notification
    setShowNotification(false);
  };


  //handle like button
  const handleLike = async (id) => {
    try {
      const likeresponse = await axiosInstance.post(baseUrl + like, { id: id });
      console.log(likeresponse);

      const updatedUserPosts = userposts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            is_liked_or_not: likeresponse.data.message === 'You have liked this post',
            like_count: likeresponse.data.like_count,
          };
        }
        return post;
      });

      setUserPosts(updatedUserPosts);
      localStorage.setItem('postlike', JSON.stringify(updatedUserPosts));
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  //comment section
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);


  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
    setIsCommentModalOpen(true);
  };

  // Function to close the CommentModal
  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };


  // follow and unfollow api call
  const [userfollow, setuserfollow] = useState({})
  const handleFollowUnfollow = async (userId) => {
    try {
      const followresponse = await FollowUnfollowApi(userId);
      if (followresponse.detail === "You are now following this user.") {
        const updatedUserPosts = userposts.map((post) => {
          if (post.user.id === userId) { // Fix: use userId here
            return {
              ...post,
              is_following_author: true,
            };
          }
          return post;
        });

        setUserPosts(updatedUserPosts);
      } else {
        const updatedUserPosts = userposts.map((post) => {
          if (post.user.id === userId) { // Fix: use userId here
            return {
              ...post,
              is_following_author: false,
            };
          }

          return post;
        });

        setUserPosts(updatedUserPosts);
      }
    } catch (e) {
      console.log(e);
      console.log("follow/unfollow got an error");
    }
  };

  //delete post 
  const handleDeletepost = async (id) => {
    try {
      const response = await axiosInstance.delete(`${baseUrl}${deletepost}/${id}/`);
      console.log(response.data);

      const updatedPosts = posts.filter((post) => post.id !== id);
      console.log(updatedPosts)
      setUserPosts(updatedPosts)

    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  // saved post
  const handleSavedPost = async (id) => {
    try {
      const savedresponse = await axiosInstance.post(`${baseUrl}posts/savepost`, { id: id });
      console.log(savedresponse);

      if (savedresponse.status === 201) {
        const updatedUserPosts = userposts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              saved_or_not: true,
            };
          }
          return post;
        });

        setUserPosts(updatedUserPosts);

      } else {
        const updatedUserPosts = userposts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              saved_or_not: false,
            };

          }

          return post;
        });

        setUserPosts(updatedUserPosts);
        navigate('/Home')
      }
    } catch (error) {
      console.error('Error handling save/unsave:', error);
    }
  };



  return (
    <div className="rounded-lg w-full  border max-w-4xl mx-auto my-8 bg-white">
      <div className="bg-gray-200 p-4">



        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handlePostClick}>create Post</button>
      </div>
      {/* Comment Modal */}



      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <label className="block mb-4">
              Caption:
              <input type="text" className="form-input mt-1 block w-full" value={caption} onChange={(e) => setCaption(e.target.value)} />
            </label>
            <label className="block mb-4">
              Hashtag:
              <input type="text" className="form-input mt-1 block w-full" value={hashtag} onChange={(e) => setHashtag(e.target.value)} />
            </label>
            <label className="block mb-4">
              Upload Image:
              <input type="file" className="form-input mt-1 block w-full" onChange={(e) => setImages(e.target.files[0])} />
            </label>
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Submit</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Notification */}
      {showNotification && (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
            <div className="rounded-lg shadow-xs overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {/* Notification Icon */}
                    <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm leading-5 font-medium text-gray-900">Post Created Successfully</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={handleCloseNotification} className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                      {/* Close Icon */}
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}





      <div className="container h-[35rem] overflow-y-scroll no-scrollbar">
        {/* post listing */}
        <div className='postlisting'>
          {userposts.map((post, index) => (
            <div key={index} className="post-card border-b border-solid border-black">
              {post.user.profile_pic ? (
                <div className="flex items-center"> {/* Container for profile pic and username */}
                  <img src={post.user.profile_pic} className="w-10 h-10 rounded-md mr-2" /> {/* Profile pic */}
                  <h6 className="profile_name">{post.user.username}</h6> {/* Username */}
                </div>
              ) : (
                <FontAwesomeIcon />
              )}


              <div className="flex items-center">
                <span className="timestamp">{calculateTimeAgo(post.created_at)}</span> {/* Timestamp */}
                <div style={{ marginRight: '20px' }} /> {/* Adding a gap */}
                <button
                  onClick={() => {
                    handleFollowUnfollow(post.user.id);
                    setTrigger(true);
                  }}
                  className="follow-btn"
                  style={{
                    color: post.is_following_author ? "red" : "blue",
                  }}
                >
                  {console.log(userfollow, "user follow")}
                  {post.is_following_author ? "Unfollow" : "Follow"}
                </button>
              </div>

              <div className='postmedias'>
                {/* posting media file */}

                {post.post_media && post.post_media.map((media, index) => (
                  <div key={index}>

                    {console.log(media, "mediaa")}
                    {media.media_file && (
                      <img src={media.media_file} alt="Post" className='post-image mb-3 rounded-md' />


                    )} </div>
                ))}
                {/* posting media file */}

              </div>
              <div className="post-details">
                <div className="post-caption">
                  <h5>{post.caption}</h5>
                </div>
                <div className="post-hashtags">
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {post.hashtags && post.hashtags.map((hash, index) => (
                      <p key={index} style={{ margin: '0', marginRight: '5px' }}>
                        #{hash.hashtag}
                      </p>
                    ))}
                  </div>

                </div>

                <div className="post-actions flex items-center">
                  {/* Like Button */}
                  <div className='like-btn' onClick={() => handleLike(post.id)}>
                    <FontAwesomeIcon icon={faHeart} color={post.is_liked_or_not ? 'red' : 'black'} />
                    <span className='ml-1'>{post.like_count}</span>
                  </div>
                  {/* savepost Button */}
                  <div className='save-btn ml-4' onClick={() => handleSavedPost(post.id)}>{console.log(post.saved_or_not, "saved or not")}
                    <FontAwesomeIcon icon={faBookmark} color={post.saved_or_not ? 'blue' : 'black'} />
                  </div>
                  {/* comment Button */}
                  <div className='share-btn ml-4' onClick={() => openCommentModal(post.id)}>
                    <FontAwesomeIcon icon={faComment} />
                  </div>
                  {isMypost &&
                    <div className='delete-btn' style={{ marginLeft: 'auto', marginRight: '20px' }} onClick={() => handleDeletepost(post.id)}>
                      <FontAwesomeIcon icon={faTrash} color='red' />
                    </div>}



                </div>




              </div>

            </div>

          ))}
        </div>
        {/* postlisting ending */}
      </div>

      {console.log(isCommentModalOpen, "open triggered")}
      {isCommentModalOpen && (
        <CommentModal isOpen={isCommentModalOpen} onRequestClose={closeCommentModal} postId={selectedPostId} user={username} />
      )}
    </div>
  );
}

export default Posts;



