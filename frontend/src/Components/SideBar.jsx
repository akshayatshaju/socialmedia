import { faPhotoFilm, faBookmark, faPeopleGroup, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

function SideBar({ pic, post, user }) {
    const navigate = useNavigate();

    const handleUserLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshjwtToken');
        navigate('/Login');
    }

    return (
        <div className="box2 w-60 h-screen border border-white-300 bg-blue shadow-md rounded-xl">
            
            <div className='myposts flex items-center py-2 px-4'>
            <FontAwesomeIcon icon={faPhotoFilm} className="w-6 h-6 text-white" />
                <Link to='' className="myposts_text ml-2 text-white" style={{ textDecoration: 'none' }}>My Posts</Link>
            </div>
            <div className='savedpost flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faBookmark}  className="w-6 h-6 text-white" />
                <Link to='' className="savedpost_text ml-2 text-white" style={{ textDecoration: 'none' }}>Saved Posts</Link>
            </div>
            <div className='followers flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faPeopleGroup}  className="w-6 h-6 text-white" />
                <Link to='' className="followers_text ml-2 text-white" style={{ textDecoration: 'none' }}>Followers</Link>
            </div>
            <div className='following flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faPeopleGroup} className="w-6 h-6 text-white" />
                <Link to='' className="following_text ml-2 text-white" style={{ textDecoration: 'none' }}>Followings</Link>
            </div>
            <div className='messages flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faEnvelope}  className="w-6 h-6 text-white" />
                <Link to='' className="messages_text ml-2 text-white" style={{ textDecoration: 'none' }}>Messages</Link>
            </div>
            <div className='logout flex items-center py-2 px-4'>
                <FontAwesomeIcon icon={faSignOutAlt}  className="w-6 h-6 text-white" />
                <button onClick={handleUserLogout} className="logout_link ml-2 text-white"  to="/Login">Log Out</button>
            </div>
        </div>
    );
}

export default SideBar;
