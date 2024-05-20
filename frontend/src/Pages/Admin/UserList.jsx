

import React, { useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
    const [showDeletedUsers] = useState(false);
    const filteredUsers = showDeletedUsers ? users.filter((user) => user.is_deleted) : users.filter((user) => !user.is_deleted);

    return (
        <div className="flex justify-center items-center w-full">
        <div className="w-full md:w-2/3">
            <Card className="h-screen w-full overflow-scroll bg-slate-300">
                <h2 className='text-red-500 p-4'>User List</h2>
            

            <div className='pt-3'>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-500 p-4">
                                <Typography
                                    variant="large"
                                    color="white"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Users
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-700 p-4">
                                <Typography
                                    variant="large"
                                    color="white"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-500 p-4">
                                <Typography
                                    variant="large"
                                    color="white"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Name
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.id} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                                <td className="p-4" >{index + 1}</td>
                                <td className="p-4">
                                    {user.is_deleted ? (
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.email}
                                        </Typography>
                                    ) : (
                                        <Link
                                            to={`/admin/admin_user/${user.email}`}
                                            className="text-black hover:scale-110 transition-transform "
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Typography variant="h5"  color="blue-gray" className="font-bold">
                                                {user.email}
                                            </Typography>
                                        </Link>
                                    )}
                                </td>
                                <td className="p-4">
                                {user.is_deleted ? (
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {user.username}
                                        </Typography>
                                    ) : (
                                        <Link
                                            //to={`/admin/admin_user/${user.username}`}
                                            className="text-black hover:scale-110 transition-transform "
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Typography variant="h5" color="blue-gray" className="font-bold">
                                                {user.username}
                                            </Typography>
                                        </Link>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
        </div>
        </div>
    );
};

export default UserList;

