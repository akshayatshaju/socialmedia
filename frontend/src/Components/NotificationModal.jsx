import React from 'react'
import { useNavigate } from 'react-router-dom';

import notificationSeenApi from '../api/NotificationSeenApi';


const NotificationModal = ({ isVisible, onClose, notification, removeNotification }) => {



    const navigate = useNavigate();


    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    }



    const getNotificationMessage = (notification) => {
        const { notification_type, post, comment } = notification;

        if (post) {
            if (notification_type === "like") {
                return "liked your post";
            } else if (notification_type === "comment") {
                return "commented on your post";
            } else if (notification_type === "post") {
                return "created a new post";
            } else if (notification_type === "blocked") {
                return "blocked you post";
            }
        } else if (comment) {
            if (notification_type === "comment") {
                return "replied to your comment";
            }
        }

        return "has started following you";
    };

    const onClick = async (notificationId, id, notificationType, postId) => {
        try {
            await notificationSeenApi(notificationId)
            removeNotification(notificationId);
            onClose();
            if (notificationType === "like" || notificationType === "comment" || notificationType === "post") {
                // Redirect to the liked post page
                // navigate(`/post/${postId}`); //=== show posta modal here

            } else if (notificationType === "blocked") {
                // Redirect to a special "blocked" page
                // navigate(`/blocked`);
            } else {
                // Default redirection (e.g., profile or a general landing page)

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className="z-20 fixed  backdrop-blur-sm flex justify-start items-center w-full max-w-fit "
            id="wrapper"
            onClick={handleClose}

        >
            <div className="my-2 flex flex-col ">
                <button className="text-red-600 text-xl place-self-end px-2" onClick={onClose}
                    style={{ border: '1px solid  rgba(209, 90, 90, 0.5)' }}
                >
                    x
                </button>
                <div className="bg-blue-100 rounded w-full">
                    <div className=''>
                        <ul className="mt-2 overflow-y-scroll h-96">
                            {notification && notification?.length > 0 ? (
                                notification.map((note, index) => (
                                    <li key={index} className=''>
                                        <p
                                            className="block w-full whitespace-nowrap px-4 py-2 text-base public hover:bg-neutral-400 active:no-underline cursor-pointer"
                                            onClick={() => onClick(note.id, note.from_user.id, note.notification_type, note.post?.id)}
                                            data-te-dropdown-item-ref

                                        >
                                            {note.notification_type === "blocked"
                                                ? "Admin blocked you post"
                                                : `${note.from_user.username} ${getNotificationMessage(note)}`}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm public hover:bg-neutral-100 active:no-underline"
                                    >No notifications</p>
                                </li>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationModal







