import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import NotificationModal from './NotificationModal';
import getNotificationsApi from '../api/getNotificationsApi';

const Navbar = ({ username, pic }) => {
  const [showNotify, setShowNotify] = useState(false);
  const [notification, setNotification] = useState([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotificationsApi();
        setNotification(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      console.log("notification websocket calling");
      const websocketProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
      const socket = new WebSocket(`${websocketProtocol}back.my-media.online/ws/notification/?token=${token}`);
      
      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        console.log(event, "notification socket event ");
        const newNotification = JSON.parse(event.data);
        console.log(newNotification, "new notification");
        if (newNotification.type === "notification") {
          setNotification((prevNotifications) => [
            ...prevNotifications,
            newNotification.payload,
          ]);
        }
        console.log(notification, "list of notifications");
      };
      
      socket.onerror = (error) => {
        console.error(error);
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
      };

      return () => {
        socket.close();
      };
    }
  }, [token]);

  const removeNotification = (notificationIdToRemove) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    );
  };

  return (
    <nav className="block w-full px-4 py-2 bg-blue-1000 border-b border-white shadow-md rounded-xl backdrop-filter backdrop-blur-2xl backdrop-saturate-200">
      <div className="container flex items-center justify-between mx-auto text-white">
        <div className='flex items-center'>
          {pic ? (
            <img src={pic} alt="Profile" className='rounded-full h-8 w-8 mr-2' />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-black h-8 w-8" />
          )}
          <span className='text-white'>Hi........{username}</span>
        </div>
        <img src="\images\logo.png" alt="Logo" className="block h-8" />
        <div className="hidden lg:block">
          <ul className="flex gap-6">
            <li className="flex items-center">
              <button
                className="text-sm leading-5 font-normal relative"
                style={{color:' black',border:'2px solid  rgba(209, 90, 90, 0.5)',backgroundColor:' rgba(209, 90, 90, 0.5)'}}
                onMouseOver={(e)=>e.currentTarget.style.cursor='pointer'}
                onClick={() => {setShowNotify(true)}}
              >
                <FontAwesomeIcon icon={faBell} className="w-6 h-6 text-white" />{" "}
                {notification?.length > 0 && (
                  <span className="absolute -top-4 -right-4 bg-sky-600 rounded-full text-white font-medium px-2 py-1 ">
                    {notification?.length}
                  </span>
                )}
              </button>
            </li>
            {showNotify && (
              <div className="notification-modal text-black w-full">
                <NotificationModal
                  isVisible={showNotify}
                  onClose={() => setShowNotify(false)}
                  notification={notification}
                  removeNotification={removeNotification}
                />
              </div>
            )}
            <li className="flex items-center">
              <input type="search" placeholder="Search" className="px-3 py-1 rounded-md border border-gray-300 text-gray-800" />
            </li>
            <li className="flex items-center">
              <button className="px-3 py-1 rounded-md bg-gray-900 text-black">Search</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
