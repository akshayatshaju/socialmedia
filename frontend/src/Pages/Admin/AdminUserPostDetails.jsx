import AdminNav from "../../Components/AdminNav";
import AdminSide from "../../Components/AdminSide";
import React, { useEffect, useState } from "react";
import {
  baseUrl,
  userpostsdetails,
  deletepostadmin,
  blockpost, // Import blockpost URL
  base,
} from "../../utils/Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstanceAdmin from "../../utils/axiosInstanceAdmin";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function AdminUserPostsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // State to track if the post is blocked

  useEffect(() => {
    axiosInstanceAdmin
      .get(`${baseUrl}${userpostsdetails}/${id}`)
      .then((response) => {
        setPost(response.data);
        setIsBlocked(response.data[0]?.blocked || false); // Set the block status
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
    axiosInstanceAdmin
      .get(`${baseUrl}posts/comments/${id}/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [trigger, id]);

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

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${baseUrl}${deletepostadmin}/${id}/`;
        axiosInstanceAdmin
          .delete(url)
          .then((res) => {
            console.log("post deleted");
            navigate("/admin/posts");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleBlockPost = async (id) => {
    const url = `${baseUrl}${blockpost}/${id}/`;
    axiosInstanceAdmin
      .post(url, { action: "block" })
      .then((response) => {
        setIsBlocked(true);
        Swal.fire("Blocked!", "The post has been blocked.", "success");
      })
      .catch((error) => {
        console.error("Error blocking post:", error);
        Swal.fire("Error", "Failed to block the post.", "error");
      });
  };

  const handleUnblockPost = async (id) => {
    const url = `${baseUrl}${blockpost}/${id}/`;
    axiosInstanceAdmin
      .post(url, { action: "unblock" })
      .then((response) => {
        setIsBlocked(false);
        Swal.fire("Unblocked!", "The post has been unblocked.", "success");
      })
      .catch((error) => {
        console.error("Error unblocking post:", error);
        Swal.fire("Error", "Failed to unblock the post.", "error");
      });
  };

  const handleDeleteComment = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${baseUrl}myAdmin/deletecomment/${id}/`;
        axiosInstanceAdmin
          .delete(url)
          .then((res) => {
            console.log("comment deleted");
            setTrigger(!trigger);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="admin">
      <AdminNav />
      <div className="flex justify-start">
        <AdminSide />

        <div
          className="details_box"
          style={{
            marginLeft: "200px",
            marginTop: "100px",
            width: "50%",
            height: "500px",
            overflowX: "auto",
            backgroundColor: "white",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "40px",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            {post.length > 0 && (
              <>
                {post[0].post_media &&
                  Array.isArray(post[0].post_media) &&
                  post[0].post_media.map((p, index) => (
                    <li
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <img
                        src={p.media_file}
                        alt={`Media ${index}`}
                        style={{ width: "10rem" }}
                      />
                    </li>
                  ))}
                <li
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "210px",
                      marginRight: "50px",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    Caption
                  </span>
                  <span style={{ marginRight: "10px", fontWeight: "bold" }}>: </span>
                  <span style={{ fontWeight: "bold" }}>{post[0].caption}</span>
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "210px",
                      marginRight: "50px",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    Created at
                  </span>
                  <span style={{ marginRight: "10px", fontWeight: "bold" }}>: </span>
                  <span style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    {formatCreatedAt(post[0].created_at)}
                  </span>
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "210px",
                      marginRight: "50px",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    Likes
                  </span>
                  <span style={{ marginRight: "10px", fontWeight: "bold" }}>: </span>
                  <span style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    {post[0].like_count}
                  </span>
                </li>
              </>
            )}
          </ul>

          <button
            style={{
              backgroundColor: "#FF5252",
              border: "5px solid #FF5252",
              marginLeft: "35%",
              marginRight: "5%",
              marginTop: "20px",
              width: "100px",
              borderRadius: "5px",
            }}
            onClick={() => handleDeletePost(post[0].id)}
          >
            Delete
          </button>

          {isBlocked ? (
            <button
              style={{
                backgroundColor: "#FF5252",
                border: "5px solid #FF5252",
                marginRight: "5%",
                marginLeft: "5%",
                marginTop: "20px",
                width: "100px",
                borderRadius: "5px",
              }}
              onClick={() => handleUnblockPost(post[0].id)}
            >
              Unblock
            </button>
          ) : (
            <button
              style={{
                backgroundColor: "#805ad5",
                border: "5px solid #805ad5",
                marginRight: "5%",
                marginLeft: "5%",
                marginTop: "20px",
                width: "100px",
                borderRadius: "5px",
              }}
              onClick={() => handleBlockPost(post[0].id)}
            >
              Block
            </button>
          )}

          <button
            style={{
              backgroundColor: "#805ad5",
              border: "5px solid #805ad5",
              marginTop: "20px",
              width: "100px",
              borderRadius: "5px",
            }}
            onClick={() => setModalShow(true)}
          >
            Comments
          </button>

          {/* <button
            style={{
              backgroundColor: "#FF5252",
              border: "5px solid #FF5252",
              marginRight: "5%",
              marginLeft: "5%",
              marginTop: "20px",
              width: "100px",
              borderRadius: "5px",
            }}
          >
            <Link
              to={`/admin/Admindash`}
              className="text-black hover:scale-110 transition-transform"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              User
            </Link>
          </button> */}

          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Comments
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
              <Container>
                <Row>
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="mb-4 flex items-center relative group p-2 bg-gray-100 rounded-lg"
                      onMouseEnter={() => setHoveredCommentId(comment.id)}
                      onMouseLeave={() => setHoveredCommentId(null)}
                    >
                      <div style={{ display: "flex" }}>
                        {comment.user.profile_pic ? (
                          <img
                            src={base + comment.user.profile_pic}
                            alt={comment.user.username}
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginRight: "5px",
                              fontWeight: "semibold",
                            }}
                          >
                            {comment.user.username}
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              marginLeft: "-10px",
                              marginTop: "15%",
                            }}
                          >
                            {comment.content}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setTrigger(true);
                            handleDeleteComment(comment.id);
                          }}
                          style={{
                            marginLeft: "90px",
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        </button>
                      </div>
                    </div>
                  ))}
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AdminUserPostsDetails;
