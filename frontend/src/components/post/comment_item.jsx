import React from "react";

const ProfilePostItem = ({ comment, user }) => {
  return (
    <li className="comment-item">
      <img className="comment-user-pic" src={user.image_url} alt="img" />
      {/* <span className="comment-owner">{comment.body}</span> */}
      <span className="comment-body">{comment.body}</span>
    </li>
  );
};

export default ProfilePostItem;
