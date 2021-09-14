import React, { useState, useEffect } from "react";
import { MetaTags } from "react-meta-tags";

// Internal
import "./UserProfile.css";

function SinglePost({ post, onPostClick }) {
  const [displayText, setDisplayText] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");

  useEffect(() => {
    const getTextToDisplay = () => {
      // in mobile view, we display part of title and body
      if (post.body.length > 0) {
        if (window.innerWidth < 350) {
          setDisplayTitle(`${post.title.substr(0, 20)}...`);
          setDisplayText(`${post.body.substr(0, 50)}...`);
        } else if (window.innerWidth < 768) {
          setDisplayTitle(post.title);
          setDisplayText(`${post.body.substr(0, 100)}...`);
        } else {
          setDisplayTitle(post.title);
          setDisplayText(post.body);
        }
      } else {
        setDisplayText(post.body);
      }
    };
    getTextToDisplay();
    window.addEventListener("resize", () => getTextToDisplay());

    return window.removeEventListener("resize", getTextToDisplay);
  }, [post.body, post.title]);

  return (
    <div className="postContainer" onClick={() => onPostClick(post.id)}>
      {/* MetaTags for SEO */}
      <MetaTags>
        <title>FlightHub User Single Post</title>
        <meta name="description" content="FlightHub Photo Viewer Single Post" />
        <meta property="og:title" content="FlightHub Single Post" />
        <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
      </MetaTags>
      <h3>{displayTitle}</h3>
      <div className="postBody">
        <p>{displayText}</p>
      </div>
    </div>
  );
}

export default SinglePost;
