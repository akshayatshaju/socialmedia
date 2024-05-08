
import { useState } from 'react';
import axiosInstanceAdmin from '../utils/axiosInstanceAdmin';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../utils/Constants';
import { Link } from 'react-router-dom';

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtTokenAdmin');
    localStorage.removeItem('refreshjwtTokenAdmin');
    navigate('/admin/AdminLogin');
  };

  const [search_user_query, setSearchUserQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axiosInstanceAdmin.get(`${baseUrl}api/search/?query=${search_user_query}`);
      console.log(response.data);
      // Handle search results
    } catch (error) {
      console.error('Error while searching:', error);
    }
  };

  return (
    <nav className="block w-full px-4 py-2 bg-blue border shadow-md rounded-xl bg-blue-500 backdrop-blur-2xl backdrop-saturate-200">
      <div className="container flex items-center justify-between mx-auto text-white">
        <img src="\images\logo.png" alt="Logo" className="block py-1.5 h-8" />
        <div className="hidden lg:block">
          <ul className="flex gap-6">
            <li className="flex items-center">
              {/* <FontAwesomeIcon icon={faSearch} className="text-black" onClick={handleSearch}/> */}
              <input type="search" placeholder="Search" className="px-3 py-1 rounded-md border border-gray-300" 
                value={search_user_query} onChange={(e) => setSearchUserQuery(e.target.value)} />
            </li>
            <li className="flex items-center">
              <button className="px-3 py-1 rounded-md bg-gray-900 text-white" onClick={handleSearch}>Search</button>
            </li>
          </ul>
        </div>
        <div className='admin_logout'>
        <Link to="/admin/AdminLogin" onClick={handleLogout} className='logout_link  text-white' style={{ textDecoration: 'none' }}>Log Out</Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
