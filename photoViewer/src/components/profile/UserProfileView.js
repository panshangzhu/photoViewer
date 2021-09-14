import React, { useMemo } from "react";
import { MetaTags } from "react-meta-tags";

// Internal
import SinglePost from "./SinglePost";
import SingleAlbum from "./SingleAlbum";
import SingleUserAvatar from "./SingleUserAvatar";
import "./UserProfile.css";

function UserProfileView({
  posts,
  albums,
  userActive,
  allUsers,
  onAlbumClick,
  onPostClick,
  onUserClick,
  onLogout,
  userId,
}) {
  const getUserName = useMemo(() => {
    const pageUser = allUsers.find((user) => user.id === Number(userId));
    return pageUser?.name || "";
  }, [allUsers, userId]);

  return (
    <div className="userProfileContainer">
      {/* MetaTags for SEO */}
      <MetaTags>
        <title>FlightHub User Profile</title>
        <meta name="description" content="FlightHub Photo Viewer Profile" />
        <meta property="og:title" content="FlightHub Profile" />
        <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
      </MetaTags>
      <div className="userHeader">
        <h4>
          <span className="welcome">Page</span> : {getUserName}
        </h4>
        <div>
          <h6>
            <span className="welcome">User</span> : {userActive?.name}
          </h6>{" "}
          <button className="logout" onClick={(e) => onLogout(e)}>
            log out
          </button>
        </div>
      </div>
      <div className="userContent">
        <div className="postsContainer">
          <h2 className="contentTitle">Posts</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <SinglePost
                post={post}
                key={post.title}
                onPostClick={onPostClick}
              />
            ))
          ) : (
            <p>Empty</p>
          )}
        </div>
        <div className="albumsContainer">
          <h2 className="contentTitle">Albums</h2>
          {albums.length > 0 ? (
            albums.map((album) => (
              <SingleAlbum
                album={album}
                key={album.title}
                onAlbumClick={onAlbumClick}
              />
            ))
          ) : (
            <p>Empty</p>
          )}
        </div>
      </div>
      <div className="otherUsersContainer">
        <h2 className="contentTitle">Other Users</h2>
        <div className="otherUsers">
          {allUsers.map((user) => {
            if (user.id !== Number(userId)) {
              return (
                <SingleUserAvatar
                  user={user}
                  key={user.name}
                  onUserClick={onUserClick}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;
