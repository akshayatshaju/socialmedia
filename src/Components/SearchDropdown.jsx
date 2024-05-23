import React from "react";
import { base } from "../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const UserSearchDropdown = ({
  isVisible,
  onClose,
  users,
  handleUserClick,
  isadmin,
}) => {
  const navigate = useNavigate();

  const navigateToAuthorProfile = (userId, userEmail) => {
    console.log(userEmail, "the coming userid");
    if (isadmin) {
      navigate(`/admin/admin_user/${userEmail}`);
    } else {
      navigate(`/authors/${userId}`);
    }

    handleUserClick();
  };

  return (
    isVisible && (
      <div
        className="absolute z-20  right-36 top-12 "
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <table
          className="border-collapse bg-blue-100 shadow-md table-followings"
          style={{ width: "100%" }}
        >
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "5px",
                    width: "80px",
                  }}
                  className="py-4"
                >
                  {user.profile_pic ? (
                    <img
                      src={base + user.profile_pic}
                      alt={`${user.username}'s profile`}
                      style={{
                        width: "45px",
                        height: "39px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    />
                  )}
                </td>
                <td
                  className="py-4"
                  onClick={() => navigateToAuthorProfile(user.id, user.email)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <strong className="text-black">{user.username}</strong>
                  <br />
                  {user.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default UserSearchDropdown;
