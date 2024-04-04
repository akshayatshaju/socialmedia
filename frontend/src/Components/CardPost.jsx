import React from 'react';

function CardPost() {
    return (
        <div className="rounded-lg w-full overflow-hidden border max-w-4xl mx-auto my-8 bg-white">
            <div className="bg-gray-200 p-4">
                <h3 className="text-xl font-bold mb-4">Create a post</h3>
                <div className="flex items-center mb-4">
                    <img className="rounded-full h-10 w-10 mr-4" src="https://example.com/user-profile-picture.jpg" alt="User profile" />
                    <span className="text-lg font-semibold">User's Name</span>
                </div>
                <div className="mb-4">
                    <textarea className="w-full border rounded-md p-2" placeholder="What's on your mind?"></textarea>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Post</button>
            </div>
        </div>
    );
}

export default CardPost;