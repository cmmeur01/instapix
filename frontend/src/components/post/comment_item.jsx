import React from "react";
import { Link } from "react-router-dom";


const ProfilePostItem = ({ comment, user }) => {
  return (
    <li className="comment-item">
      <Link to={`/users/${user.username}`}>
        <img className="comment-user-pic" src={user.image_url} alt="img" />
      </Link>
      <span className="comment-body">
        <Link className="post-comment-link" to={`/users/${user.username}`}><strong>{user.username}</strong></Link>  {comment.body}
      </span>
    </li>
  );
};

export default ProfilePostItem;
