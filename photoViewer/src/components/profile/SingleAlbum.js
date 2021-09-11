import React from "react";

// Internal
import "./UserProfile.css"

function SingleAlbum({ album }) {
  return (
      <div className="albumContainer">
         <h4 className="albumTitle">{album.title}</h4>
      </div>
  );
}

export default SingleAlbum;
