import React from "react";
import { Link } from "react-router-dom";

const ProfilePostItem = ({ currentUser, post }) => {
  return (
    <Link to={`/posts/${post._id}`}>
      <li className="test-div">
        <img src={post.imgUrl} alt="img" />
      </li>
    </Link>
  );
};
export default ProfilePostItem;
