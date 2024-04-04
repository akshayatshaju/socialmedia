import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

    const [showdeletedusers] = useState(false)
    const filteredusers = showdeletedusers ? users.filter((user) => user.is_deleted) : users.filter((user) => !user.is_deleted)
    console.log(filteredusers)
    return (
        <div>
            <h2 className='text-red-500 '>User List</h2>

            {/* <button className=' text-green-700' onClick={() => setShowDeletedUsers(!showdeletedusers)}>
                {showdeletedusers ? 'Show All Users' : 'Show Deleted Users'}
            </button> */}


            <div className='pt-3'>
                <table className="table-auto" >
                    <thead>
                        <tr>
                            <th>Users</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredusers.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {user.is_deleted ? (
                                        <span>{user.email}</span>
                                    ) : (
                                        <Link
                                            to={`/admin/admin_user/${user.email}`}
                                            className="text-black  hover:scale-110 transition-transform"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {user.email}
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );

};

export default UserList;
