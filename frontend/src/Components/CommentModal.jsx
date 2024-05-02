import { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { baseUrl, base } from "../utils/Constants";
import ReplyDeleteApi from "../api/ReplyDeleteApi";
import ReplyToComment from "../api/ReplyToComment";
import { toast } from "react-toastify";
import createCommentApi from "../api/createCommentApi";
import CommentDeleteApi from "../api/CommentDeleteApi";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUser, faReply,faTrash } from "@fortawesome/free-solid-svg-icons";

const CommentModal = ({ isOpen, onRequestClose, postId, user }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null); // State to track which comment is being replied to
  const [replyModalOpen, setReplyModalOpen] = useState(false); // State to manage reply modal visibility
  const [repliedComments, setRepliedComments] = useState([]); // State to store replied comments
  const [newReply, setnewReply] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`${baseUrl}posts/comments/${postId}/`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data, "comments");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [trigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postId) {
      try {
        await createCommentApi(postId, newComment);
        setTrigger(false);
        toast.success("Successfully Created", {
          position: "top-center",
        });
        setNewComment("");
        onRequestClose();
      } catch (error) {
        toast.error("Failed to Create Post", {
          position: "top-center",
        });
      }
    }
  };

  const handleDeleteComment = async (id) => {
    if (id) {
      try {
        console.log("Deleting comment with id:", id);
        await CommentDeleteApi(id);
        toast.success("Comment Deleted Successfully!", {
          position: "top-center",
        });
        setTrigger(false);
      } catch (error) {
        toast.error("Comment Not Deleted!", {
          position: "top-center",
        });
      }
    }
  };

  //------------------reply------------------------------------

  const handleReply = async (commentId) => {
    console.log(commentId, "commentidfrom modaal");
    setReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setReplyModalOpen(false);
  };



  const handleReplySubmit = async (e, commentId) => {
    try {
      e.preventDefault();

      console.log(newReply, commentId, "commentid from function");

      const formData = new FormData();
      formData.append("content", newReply);
      formData.append("comment", commentId);

      const response = await axiosInstance.post(
        `${baseUrl}posts/replytocomment/${commentId}/`,
        formData
      );

      setTrigger(false);
      toast.success("Successfully Created", {
        position: "top-center",
      });
      setnewReply("");
      onRequestClose();
    } catch (error) {
      toast.error("Failed to Comment", {
        position: "top-center",
      });
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleViewReplies = (commentId) => {
    axiosInstance.get(`${baseUrl}posts/getreplies/${commentId}/`)
    .then((response) => {
      setRepliedComments(response.data);
      console.log(response.data, "getreplies");
    })


  
    // Logic to handle opening the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Logic to handle closing the modal
    setShowModal(false);
  };

  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onRequestClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Comment Modal"
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "25%",
        },
        content: {
          width: "50%",
          border: "3px solid rgba(209, 90, 90, 0.5)",
          borderRadius: "15px",
          filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))",
        },
      }}
    >
      <div>
        <button onClick={onRequestClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>

      <div style={{ paddingLeft: "5%" }}>
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
                  style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                />
              )}
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "5px", fontWeight: "bold" }}>
                  {comment.user.username}
                </p>
                <p
                  style={{
                    fontWeight: "semibold",
                    marginLeft: "-10px",
                    marginTop: "15%",
                  }}
                >
                  {comment.content}
                </p>
              </div>
            </div>

            {hoveredCommentId === comment.id && comment.user.id === user.id && (
              <button
                
                onClick={() => {
                  setTrigger(true);
                  handleDeleteComment(comment.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} color="red" />
              </button>
            )}

            <span style={{ marginRight: "10px" }}></span>

            {/* Reply button */}
            <button
              className="ml-2"
              onClick={() => handleReply(comment.id)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faReply} />
            </button>

            {/* reply comment modal */}

            <Modal
              isOpen={replyModalOpen}
              onRequestClose={closeReplyModal}
              contentLabel="Reply Modal"
              style={{
                overlay: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "25%",
                },
                content: {
                  width: "40%",
                  border: "3px solid rgba(209, 90, 90, 0.5)",
                  borderRadius: "15px",
                  filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))",
                  height: "30%",
                },
              }}
            >
              <div>
                <button onClick={closeReplyModal}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <h3>Reply to Comment</h3>

                <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                  <textarea className="bg-slate-300"
                    value={newReply}
                    onChange={(e) => setnewReply(e.target.value)}
                    placeholder="Write your reply..."
                    rows="3"
                  />
                  <button className="bg-slate-500" type="submit">Submit Reply</button>
                </form>
               
              
              </div>
            </Modal>

            {/* Button to view replies */}
            <button
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => handleViewReplies(comment.id)}
      >
        View Replies
      </button>
      
{/* view replied comments modal */}

      <Modal isOpen={showModal} onClose={handleCloseModal}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "25%",
        },
        content: {
          width: "40%",
          border: "3px solid rgba(209, 90, 90, 0.5)",
          borderRadius: "15px",
          filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))",
          height : "30%",
          backgroundColor:"lightskyblue"
        },
      }}>
      <button onClick={handleCloseModal}>x</button>
      
        <h2>Replies Modal</h2>
        {/* Your content for the modal */}
        {repliedComments.map((reply) => (
                  <div key={reply.id}
                    className="mb-4 flex items-center relative group p-2 bg-gray-100 rounded-lg"
            onMouseEnter={() => setHoveredCommentId(reply.id)}
            onMouseLeave={() => setHoveredCommentId(null)}>
          
          <div style={{ display: "flex" }}>
              {reply.user.profile_pic ? (
                <img
                  src={base + reply.user.profile_pic}
                  alt={reply.user.username}
                  style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                />
              )}
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "5px", fontWeight: "bold" }}>
                  {reply.user.username}
                </p>
                <p
                  style={{
                    fontWeight: "semibold",
                    marginLeft: "-10px",
                    marginTop: "15%",
                  }}
                >
                  {reply.content}
                </p>
              </div>
            </div>
                  </div>
                ))}
      
      
      </Modal>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "80%", position: "fixed", width: "90%" }}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setTrigger(true);
          }}
          className="flex-grow flex items-end"
          style={{ display: "flex" }}
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="1"
            style={{ width: "80%" }}
          />
          <button type="submit" className="py-2 px-4 ml-4 bg-slate-500">
            Comment
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;
