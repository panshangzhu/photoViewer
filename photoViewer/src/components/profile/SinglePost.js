import React from "react";

// Internal
import "./UserProfile.css";

function SinglePost({ post }) {
  return (
    <div className="postContainer">
      <h3>{post.title}</h3>
      <div className="postBody">
        <p>{post.body}</p>
      </div>
    </div>
  );
}

export default SinglePost;
