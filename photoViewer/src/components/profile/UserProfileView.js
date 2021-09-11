import React from "react";

// Internal
import SinglePost from "./SinglePost";
import SingleAlbum from "./SingleAlbum";
import "./UserProfile.css";

function UserProfileView({ posts, albums }) {
  return (
    <div className="userProfileContainer">
      <div className="userHeader">
        <h4>Welcome userName</h4>
        <button className="logout">log out</button>
      </div>
      <div className="userContent">
        <div className="postsContainer">
          <h2 className="contentTitle">Your Posts</h2>
          {posts.length > 0 ? (
            posts.map((post) => <SinglePost post={post} />)
          ) : (
            <p>Empty</p>
          )}
        </div>
        <div className="albumsContainer">
          <h2 className="contentTitle">Your Albums</h2>
          {albums.length > 0 ? (
            albums.map((album) => <SingleAlbum album={album} />)
          ) : (
            <p>Empty</p>
          )}
        </div>
      </div>
      <div className="otherUsers">otherUsers</div>
    </div>
  );
}

export default UserProfileView;
