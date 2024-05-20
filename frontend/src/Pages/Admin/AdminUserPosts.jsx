import AdminNav from "../../Components/AdminNav";
import AdminSide from "../../Components/AdminSide";
import React, { useEffect, useState } from "react";
import { baseUrl, userposts } from "../../utils/Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstanceAdmin from "../../utils/axiosInstanceAdmin";
import { Card, Typography } from "@material-tailwind/react";

function AdminUserPosts(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  console.log(posts, "posts");

  const { userEmail } = useParams();
  console.log(userEmail, "got user email");

  useEffect(() => {
    axiosInstanceAdmin
      .get(`${baseUrl}${userposts}/${userEmail}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [userEmail]);

  const handlePostDetails = (id) => {
    navigate(`/admin/admin_user_posts_details/${id}`);
  };

  // Function to format date using Intl.DateTimeFormat
  const formatCreatedAt = (createdAt) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).format(new Date(createdAt));
  };
  return (
    <div className="admin">
      <AdminNav />
      <div className="flex justify-start">
        <AdminSide />
        <div className="flex justify-center items-center w-full">
          <div className="w-full md:w-2/3">
            <Card className=" h-screen w-full overflow-scroll bg-slate-300">
              <div className="flex flex-col">
                <div className="text-black text-base ml-5 mt-3">
                  <h2 className="text-red-500 text-5xl ml-auto mt-3">
                    {posts.user}Post List
                  </h2>
                </div>

                <table className="mt-8">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-500 p-4">
                        <Typography
                          variant="h5"
                          color="white"
                          className="font-bold leading-none opacity-70"
                        >
                          Users Post Captions
                        </Typography>
                      </th>
                      {/* <th className="border-b border-blue-gray-100 bg-blue-700 p-4">
                    <Typography
                      variant="large"
                      color="white"
                      className="font-normal leading-none opacity-70"
                    >
                      Email
                    </Typography>
                  </th> */}
                    </tr>
                  </thead>
                  <tbody className="flex flex-col ml-1">
                    {posts.map((p, index) => (
                      <tr key={p.id} className="mb-2">
                        <td className="p-4">{index + 1}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor: "transparent",
                              textDecoration: "none",
                              color: "black",
                              transformOrigin: "center",
                              display: "inline-block",
                              fontSize: "20px",
                              fontWeight: "bold"
                            }}
                            // onMouseOver={(e) => (
                            //   (e.currentTarget.style.color = "black"),
                            //   (e.currentTarget.style.cursor = "pointer")
                            // )}
                            // onMouseOut={(e) =>
                            //   (e.currentTarget.style.color = "blue")
                            // }
                            onClick={() => handlePostDetails(p.id)}
                          >
                            {p.caption}---{formatCreatedAt(p.created_at)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserPosts;
