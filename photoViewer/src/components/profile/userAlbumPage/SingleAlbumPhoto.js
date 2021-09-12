import React from "react";

// Internal
import "./UserAlbum.css";

function SingleAlbumPhoto({ photo }) {
  if (!photo) return null;
  return (
    <div className="photoContainer">
      <a target="_blank" rel="noreferrer" href={photo.url} className="albumPhoto">
        <h4 className="photoTitle">{photo.title}</h4>
        <img src={photo.thumbnailUrl} alt="albumPhoto" className="photoImg" />
      </a>
    </div>
  );
}

export default SingleAlbumPhoto;
