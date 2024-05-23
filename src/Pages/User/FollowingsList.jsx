import React, { useEffect, useState } from "react";
import { baseUrl, user, mypost, recommended } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../Components/NavBar";
import { Loader } from "rsuite";
import SideBar from "../../Components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FollowUnfollowApi from "../../api/FollowUnFollowApi";

const FollowingListPage = () => {
  const [following, setFollowing] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userposts, setUserposts] = useState([]);
  const [recommendedposts, setRecomposts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(baseUrl + user);
        const postresponse = await axiosInstance.get(baseUrl + mypost);
        const recommendedResponse = await axiosInstance.get(
          baseUrl + recommended
        );

        const userdata = response.data;

        setUserName(response.data);
        setUserposts(postresponse.data);
        setRecomposts(recommendedResponse.data);

        if (userdata) {
          axiosInstance
            .get(`${baseUrl}posts/followings/${userdata.id}/`)
            .then((response) => {
              if (response.data.length > 0) {
                setFollowing(response.data);
              } else {
                console.log("no followings");
              }
            })
            .catch((error) => {
              console.error("Error fetching following:", error);
            });
        } else {
          console.log("error getting user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const [userfollow, setuserfollow] = useState({});

  const handleFollowUnfollow = async (userId) => {
    try {
      const followresponse = await FollowUnfollowApi(userId);

      const updatedFollowing = following.filter(
        (user) => user.following.id !== userId
      );

      setFollowing(updatedFollowing);
      const updatedFollowState = {
        ...userfollow,
        [userId]: {
          follow: followresponse.detail === "You are now following this user.",
        },
      };

      setuserfollow(updatedFollowState);
    } catch (e) {
      console.log(e);
      console.log("follow/unfollow got error");
    }
  };

  return (
    <>
      {userName && userposts ? (
        <div className="home">
          <Navbar username={userName.username} pic={userName.profile_pic} />
          <div className="flex flex-row">
            <SideBar />
            <div className="ml-52 w-1/2">
              {following.length > 0 ? (
                <div className="mt-4">
                  <h2 className="text-white">Followings</h2>
                  <div className="overflow-x-auto h-screen">
                    <table className="border-collapse bg-white shadow-md w-full">
                      <tbody>
                        {following.map((followingUser) => (
                          <tr
                            key={followingUser.id}
                            className="hover:bg-gray-100"
                          >
                            <td className="py-4 px-6">
                              {followingUser.following.profile_pic ? (
                                <img
                                  src={followingUser.following.profile_pic}
                                  alt={`${followingUser.following.username}'s profile`}
                                  className="w-12 h-12 rounded-full"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="w-12 h-12 rounded-full border border-black p-1"
                                />
                              )}
                            </td>
                            <td
                              className="py-4 px-6 text-lg text-gray-900 cursor-pointer"
                              onClick={() =>
                                navigate(`/profile/${followingUser.following.id}`)
                              }
                            >
                              {followingUser.following.username}
                            </td>
                            <td className="py-4 px-6">
                              <button
                                type="button"
                                className="text-white bg-red-500 border border-black rounded px-4 py-2 transition duration-300 hover:bg-red-600"
                                onClick={() =>
                                  handleFollowUnfollow(followingUser.following.id)
                                }
                              >
                                Unfollow
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <h2 className="text-white mt-4">No Followings</h2>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loader center content="Loading" size="lg" />
        </div>
      )}
    </>
  );
};

export default FollowingListPage;
