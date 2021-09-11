import React from "react";

// External
import classNames from "classnames";

// Internal
import "./Overlay.css";

class Overlay extends React.Component {

  render() {
    const { open } = this.props;

    return (
      <div
        key="waitOverlay"
        className={classNames("waitOverlay", open ? "open" : "")}
      >
        <div className="minimalistGrid">
        <div className="circle" />
      </div>
      </div>
    );
  }
}

export default Overlay;
