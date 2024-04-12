import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Posts from '../../Components/Posts';
import { baseUrl, editprofile,changeprofile, user,mypost } from '../../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faBookmark, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../utils/axiosInstance';
//import { Link, useParams } from 'react-router-dom';
//import axios from 'axios';
import ChangePassModal from '../../Components/ChangePassModal';
import { Loader } from 'rsuite';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ImageCropper from '../../Components/ImageCropper';
import ReactBootstrapModal from 'react-bootstrap/Modal';


const Profilepage = () =>  {
    const [userName, setUserName] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const [croppedImage, setCroppedImage] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Check if the user is authenticated
          
  
          // Fetch user details if authenticated
          const postresponse = await axiosInstance.get(baseUrl + mypost);
          console.log('PostResponse:', postresponse.data);
          setPosts(postresponse.data);
          const response = await axiosInstance.get(baseUrl + user);
          setUserName(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }finally {
          setIsLoading(false); // Set loading to false once data is fetched (whether successful or not)
        }
      };
  
      fetchData();
    }, [])
  
  
    // modal managing for edit profile modal
    const [name,setName]=useState(userName?userName.name:"");
    const [username,setUsername]=useState(userName?userName.username:"");
    const [email,setEmail]=useState(userName?userName.email:"");
    const [phone, setPhone] = useState(userName?userName.phone : "");
    const [show, setShow] = useState(false);
  
  
    const handleEditProfileClicked = () => {
      handleOpenEditModal();
    };
    const handleOpenEditModal = () => {
      console.log("clicked edit modal")
      setShow(true);
      setUsername(userName?userName.username:"")
      setEmail(userName?userName.email:"")
      setPhone(userName?userName.phone:"")
      setName(userName?userName.name:"")
      
    };
    const handleCloseEditModal = () => {
      setShow(false);
    };
    
  
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
  
  
    console.log(userName)
    
    
    const handleEditSubmit = async () => {
       // Check if email is empty
       if (!email.trim()) {
        setEmailError("Email is required");
        return;
    }
    else if(!email.includes('@')){
      setEmailError("Email Format not required");
        return;
  
    }
  
     // Check if username is empty
     if (!username.trim()) {
      setUsernameError("Email is required");
      return;
  }
  
   
    // Clear previous email error if any
    setEmailError("");
      const formData = new FormData();
  
      // Append each field to the FormData object
      formData.append('username', username);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      try {
  
        
          const response = await axiosInstance.patch(baseUrl + editprofile, formData);
          console.log(response)
          setUserName(prevState => ({ ...prevState, username: username,email:email,phone:phone,name:name }));
  
          handleCloseEditModal()
        }catch(error){
           console.log(error)
        }
      }
    // Modal managing function for change profile picture
  
    const handleProfilePictureChange = () => {
      handleOpenModal();
    };
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
      const handleCloseModal = () => {
        setCroppedImage(null)
        setSelectedPhoto(null)
        setIsModalOpen(false);
      };
  
      const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(file);
        setCroppedImage(null); // Reset cropped image when a new photo is selected
      };
  
      const handleCrop =(cropped)=>{
        const croppedURL = URL.createObjectURL(cropped)
        setCroppedImage(croppedURL);
        setSelectedPhoto(null)
        
      }
  
      const handlePhotoSubmit = async() => {
        if (croppedImage) {
          // Create a FormData object
          const formData = new FormData();
      
          const croppedImageData = await (async () => {
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            const fileName = 'croppedImage.png'; // You can generate a unique filename here
            formData.append('profile_pic', blob, fileName);
            return { blob, fileName };
          })();
          
          // Make the PATCH request with the FormData
          axiosInstance.patch(baseUrl + changeprofile, formData,{
            headers: {
              'Content-Type': 'multipart/form-data',  // Important for handling files
            },
          })
            .then(response => {
              console.log(response.data);
              setUserName(prevState => ({ ...prevState, profile_pic: response.data.updatedProfilePic }));
  
              handleCloseModal();
            })
            .catch(error => {
              console.error('Error updating profile picture:', error);
            });
        }
      };
       
      // change password click 
      const [open,setOpen] = useState(false)
     
    const handlePasswordChangeSuccess = () => {
      setOpen(false); // Close the modal when password change is successful
    };
     const  handleOpen = ()=>{
      setOpen(true)
     }
     const  handleClose = ()=>{
      setOpen(false)
     }
     

     const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        console.log(sortedPosts,"posts")



    return (


        <>
            <div className='home'>
                <Navbar username={userName ? userName.username : ""} pic={userName ? userName.profile_pic : ""} />
                <div className='flex flex-row'>
                    <SideBar pic={userName ? userName.profile_pic : ""} />
                    <div>
                        {userName ? (
                            <div className='bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8 mt-8'>
                                <div className='bg-white rounded-lg p-8 shadow-md text-center'>
                                    <div className='mb-6'>
                                        {userName.profile_pic ? (
                                            <img
                                                className='rounded-circle w-32 h-32 object-cover border-4 border-white mx-auto mb-4'
                                                src={userName.profile_pic}
                                                alt="User Profile"
                                                style={{ width: '100px', height: '100px', marginTop: '5%' }}
                                                onMouseOver={(e) => { e.currentTarget.style.opacity = '.5'; e.currentTarget.style.cursor = 'pointer' }}
                                                onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
                                                onClick={handleProfilePictureChange}
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faUser} className="text-5xl text-gray-500 mx-auto mb-4"
                                                style={{ width: '100px', height: '100px', marginTop: '5%' }}
                                                onMouseOver={(e) => { e.currentTarget.style.opacity = '.5'; e.currentTarget.style.cursor = 'pointer' }}
                                                onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
                                                onClick={handleProfilePictureChange} />
                                        )}
                                        <h1 className='text-3xl font-bold mb-2'>{userName.username}</h1>

                                        <div className='text-gray-600 mb-2 follow-stats'>
                                            <div>
                                                <p className='font-bold'>Followers</p>
                                                <p className='text-xl'>{userName.followers_count}</p>
                                            </div>
                                            <div>
                                                <p className='font-bold'>Following</p>
                                                <p className='text-xl'>{userName.followings_count}</p>
                                            </div>
                                            <div>
                                                <p className='font-bold'>Posts</p>
                                                <p className='text-xl'>{userName.posts_count}</p>
                                            </div>
                                        </div>

                                        <div className='text-gray-600 mb-2'>
                                            <p>Email: {userName.email}</p>
                                            {userName.phone && <p>Phone Number: {userName.phone}</p>}
                                            {userName.name && <p>Name: {userName.name}</p>}

                                        </div>

                                        <div className='flex buttons-container'>
                                            <button className='btn edit-profile-btn' onClick={handleEditProfileClicked}>Edit Profile</button>

                                            <button className='btn change-pass-btn' onClick={handleOpen}>Change Password</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : (

                            <div>
                                <Loader center content="loading" size='lg' />
                            </div>
                        )}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={handleCloseModal}
                            contentLabel='Change Profile Picture'
                            style={{
                                content: {
                                    width: '40%',
                                    height: '60%',
                                    margin: 'auto',
                                    border: '1.5px solid black',
                                    borderRadius: '15px'
                                },
                            }}

                        >
                            <div className="flex justify-between items-start mb-4">
                                <button className='btn close-btn' onClick={handleCloseModal} style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '35px',
                                    cursor: 'pointer',
                                    color: ' #ff0000',
                                    marginLeft: '90%'
                                }}>
                                    &times;
                                </button>
                                <h2 className='text-2xl font-bold' style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    marginLeft: '30%',
                                    marginTop: '-40px'
                                }}>Change Profile Picture</h2>
                            </div>
                            <input type='file' accept='image/*' onChange={handlePhotoChange} />
                            {selectedPhoto && <ImageCropper src={URL.createObjectURL(selectedPhoto)} onCropComplete={handleCrop} />}
                            {croppedImage && (
                                <img
                                    src={croppedImage}
                                    alt="Cropped Profile Pic"
                                    style={{ width: '100px', height: '100px', margin: '5% auto 0', borderRadius: '50%', }}
                                />
                            )}
                            <div className="flex justify-center mt-4">

                                <button className='btn' onClick={handlePhotoSubmit} style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    border: '1px solid black',
                                    marginLeft: 'auto',
                                    marginRight: 'auto'

                                }}
                                >
                                    Submit
                                </button>
                            </div>

                        </Modal>
                        <ReactBootstrapModal show={show} onHide={handleCloseEditModal}>
                            <ReactBootstrapModal.Header closeButton>
                                <ReactBootstrapModal.Title>Modal heading</ReactBootstrapModal.Title>
                            </ReactBootstrapModal.Header>
                            <ReactBootstrapModal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoFocus
                                            style={{ borderColor: emailError ? 'red' : 'black' }}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"

                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            autoFocus
                                            style={{ borderColor: usernameError ? 'red' : 'black' }}
                                        />

                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"

                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
                                        />

                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={phone}
                                            autoFocus
                                            onChange={(e) => setPhone(e.target.value)} />

                                    </Form.Group>
                                </Form>
                            </ReactBootstrapModal.Body>
                            <ReactBootstrapModal.Footer>
                                <Button variant="secondary" onClick={handleCloseEditModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleEditSubmit}>
                                    Save Changes
                                </Button>
                            </ReactBootstrapModal.Footer>
                        </ReactBootstrapModal>


                        {open && <ChangePassModal isOpen={open} onRequestClose={handleClose} user={userName} onPasswordChangeSuccess={handlePasswordChangeSuccess} />}



                    </div>
                    <Posts username={userName ? userName : ""} posts={sortedPosts} pic={userName ? userName.profile_pic : ""} isMypost={true} />

                </div>
            </div>
        </>

    );
}

export default Profilepage;




