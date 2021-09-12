import React from "react";

// Internal
import "./UserProfile.css"

function SingleAlbum({ album, onAlbumClick }) {
  return (
      <div className="albumContainer" onClick={() => onAlbumClick(album.id)}>
         <h4 className="albumTitle">{album.title}</h4>
      </div>
  );
}

export default SingleAlbum;
