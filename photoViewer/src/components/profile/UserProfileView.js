import React from "react";

// Internal
import SinglePost from "./SinglePost";
import SingleAlbum from "./SingleAlbum";
import SingleUserAvatar from "./SingleUserAvatar";
import "./UserProfile.css";

function UserProfileView({
  posts,
  albums,
  userActive,
  otherUsers,
  onAlbumClick,
  onLogout,
}) {
  return (
    <div className="userProfileContainer">
      <div className="userHeader">
        <h4><span className="welcome">Welcome</span> {userActive?.name}</h4>
        <button className="logout" onClick={(e) => onLogout(e)}>log out</button>
      </div>
      <div className="userContent">
        <div className="postsContainer">
          <h2 className="contentTitle">Your Posts</h2>
          {posts.length > 0 ? (
            posts.map((post) => <SinglePost post={post} key={post.title} />)
          ) : (
            <p>Empty</p>
          )}
        </div>
        <div className="albumsContainer">
          <h2 className="contentTitle">Your Albums</h2>
          {albums.length > 0 ? (
            albums.map((album) => (
              <SingleAlbum album={album} key={album.title} onAlbumClick={onAlbumClick} />
            ))
          ) : (
            <p>Empty</p>
          )}
        </div>
      </div>
      <div className="otherUsersContainer">
        <h2 className="contentTitle">Other Users</h2>
        <div className="otherUsers">
          {otherUsers.map((user) => (
            <SingleUserAvatar user={user} key={user.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;
