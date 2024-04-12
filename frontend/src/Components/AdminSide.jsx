import { Link } from 'react-router-dom';


function AdminSide() {
  return (
    <div className="box2 w-60 h-screen border border-white-300 bg-blue-500 shadow-md rounded-xl">
      <div className='myposts flex items-center py-2 px-4'>
       
        <Link to='/Admin/AdminDash' className="myposts_text ml-2 text-white" style={{ textDecoration: 'none' }}> UserManage </Link>
      </div>
      <div className='savedpost flex items-center py-2 px-4'>
        
        <Link to="/Admin/chart" className="savedpost_text ml-2 text-white" style={{ textDecoration: 'none' }}> AdminDashboard</Link>
      </div>
      <div className='followers flex items-center py-2 px-4'>
        
        <Link to='/Admin/posts' className="followers_text ml-2 text-white" style={{ textDecoration: 'none' }}>PostsManage</Link>
      </div>
      <div className='following flex items-center py-2 px-4'>
        
        <Link to='' className="following_text ml-2 text-white" style={{ textDecoration: 'none' }}>CommentManage</Link>
      </div>
      
    </div>
  );
}

export default AdminSide;