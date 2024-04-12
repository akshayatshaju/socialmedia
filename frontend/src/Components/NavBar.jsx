import React from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Navbar = ({ username,pic}) => {
  return (
    <nav className="block w-full px-4 py-2 bg-blue border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="container flex items-center justify-between mx-auto text-white">
      <div className='nav_profile'>
          {/* {pic ? (
            <img src={pic} alt="Profile" className='rounded-circle'  />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-black nav_image" />
          )} */}
          <span className=''>Hi........{username}</span>
        </div>
      <img src="\images\logo.png" alt="Logo" className="block py-1.5 h-8" />
        <div className="hidden lg:block">
          <ul className="flex gap-6">
            <li className="flex items-center">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add your SVG path here */}
              </svg>
              
              
              <Link to="" className="flex items-center  text-white" style={{ textDecoration: 'none' }}><strong>Notifications</strong></Link>
            </li>
            <li className="flex items-center">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add your SVG path here */}
              </svg>
              
              <Link to="/profile" className="flex items-center  text-white" style={{ textDecoration: 'none' }}><strong>Profile</strong></Link>
            </li>
            <li className="flex items-center">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add your SVG path here */}
              </svg>
              <Link to="/Home" className="flex items-center  text-white" style={{ textDecoration: 'none' }}><strong>Home</strong></Link>
            </li>
            <li className="flex items-center">
              <input type="search" placeholder="Search" className="px-3 py-1 rounded-md border border-gray-300" />
            </li>
            <li className="flex items-center">
              <button className="px-3 py-1 rounded-md bg-gray-900 text-white">Search</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
