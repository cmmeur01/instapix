import React from "react";

const ProfilePostItem = ({ comment, user }) => {
  debugger
  return (
    <li className="comment-item">
      <img src={user.image_url} alt="img" />
      <span>{comment.body}</span>
    </li>
  );
};
export default ProfilePostItem;
