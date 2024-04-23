import { faPhotoFilm, faBookmark, faPeopleGroup, faEnvelope, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';







function SideBar({ pic, post, user }) {
    const navigate = useNavigate();

    const handleUserLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshjwtToken');
        navigate('/Login');
    }
    // const [showFollowerModal, setShowFollowerModal] = useState(false);
    // const [showFollowingModal, setShowFollowingModal] = useState(false);

    // const handleFollowerModal = () => {
    //     setShowFollowerModal(true);
    // };

    // const handleCloseFollowerModal = () => {
    //     setShowFollowerModal(false);
    // };

    // const handleFollowingModal = () => {
    //     setShowFollowingModal(true);
    // };

    // const handleCloseFollowingModal = () => {
    //     setShowFollowingModal(false);
    // };








    return (
        <div className="box2 w-60 h-screen border border-white-300 bg-blue shadow-md rounded-xl">

            <div className='myposts flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faPhotoFilm} className="w-6 h-6 text-white" />
                <Link to='/myposts' className="myposts_text ml-2 text-white" style={{ textDecoration: 'none' }}>My Posts</Link>
            </div>
            <div className='savedpost flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faBookmark} className="w-6 h-6 text-white" />
                <Link to='/user-saved-posts' className="savedpost_text ml-2 text-white" style={{ textDecoration: 'none' }}>Saved Posts</Link>
            </div>
            <div className='following flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faPeopleGroup} className="w-6 h-6 text-white" />
                <Link to='/followers' className="following_text ml-2 text-white" style={{ textDecoration: 'none' }}>
                    Followers
                    {/* <button className="mr-2 rounded-lg border bg-primary hover:bg-secondary text-white py-1 px-2" onClick={handleFollowerModal}>Followers</button> */}
                </Link>
            </div>
            {/* {showFollowerModal && (
                <div className=" fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="rounded-lg shadow-md">
                        <FollowerModal isOpen={showFollowerModal} onClose={handleCloseFollowerModal} />
                    </div>
                </div>
            )} */}

            <div className='following flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faPeopleGroup} className="w-6 h-6 text-white" />
                <Link to='/followings' className="following_text ml-2 text-white" style={{ textDecoration: 'none' }}>
                    Following

                </Link>
            </div>

            
            
            <div className='messages flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-white" />
                <Link to='/profile' className="messages_text ml-2 text-white" style={{ textDecoration: 'none' }}>Profile</Link>
            </div>
            <div className='messages flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-white" />
                <Link to='/Chat' className="messages_text ml-2 text-white" style={{ textDecoration: 'none' }}>Messages</Link>
            </div>
            <div className='logout flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6 text-white" />
                <button onClick={handleUserLogout} className="logout_link ml-2 text-white" to="/Login">Log Out</button>
            </div>
        </div>
    );
}

export default SideBar;
