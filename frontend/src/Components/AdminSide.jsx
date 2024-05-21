import { Link } from 'react-router-dom';


function AdminSide() {
  return (
    <div className="box2 w-60 h-screen border border-white-300 bg-blue-500 shadow-md rounded-xl">
      <div className='myposts flex items-center py-2 px-4'>
       
        <Link to='/admin/AdminDash' className="myposts_text ml-2 text-white" style={{ textDecoration: 'none' }}> UserManage </Link>
      </div>
      <div className='savedpost flex items-center py-2 px-4'>
        
        <Link to="/admin/chart" className="savedpost_text ml-2 text-white" style={{ textDecoration: 'none' }}> AdminDashboard Month</Link>
      </div>
      <div className='savedpost flex items-center py-2 px-4'>
        
        <Link to="/admin/Yearchart" className="savedpost_text ml-2 text-white" style={{ textDecoration: 'none' }}> AdminDashboard Year</Link>
      </div>
      
      <div className='followers flex items-center py-2 px-4'>
        
        <Link to='/admin/posts' className="followers_text ml-2 text-white" style={{ textDecoration: 'none' }}>PostsManage</Link>
      </div>
      
      
      
    </div>
  );
}

export default AdminSide;