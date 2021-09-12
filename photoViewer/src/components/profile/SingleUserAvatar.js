import React, { useMemo } from "react";

// Internal
import "./UserProfile.css";

function SingleUserAvatar({ user }) {
  // get name initials
  const getNameInitals = useMemo(() => {
    // display name initals
    const fullName = user.name.split(" ");
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }, [user.name]);

  if (!user) return null;

  return (
    <div className="userAvatarContainer">
        <p className="avatarName">{getNameInitals}</p>
    </div>
  );
}

export default SingleUserAvatar;
