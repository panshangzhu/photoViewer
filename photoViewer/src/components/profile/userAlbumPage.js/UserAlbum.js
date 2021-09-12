import React, { Component } from "react";

// External
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push, goBack } from "connected-react-router";

// Internal
import { getData } from "api/Api";
import Overlay from "components/common/overlay/Overlay";
import { getUserDetail } from "redux/reducers/authReducer/Selectors";
import SingleAlbumPhoto from "./SingleAlbumPhoto";
import "./UserAlbum.css";

const stateToProps = (state) => ({
  userActive: getUserDetail(state),
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      push,
      goBack,
    },
    dispatch
  ),
});

class UserAlbum extends Component {
  state = {
    openOverLay: false,
    photos: [],
  };

  closeOverLay = () => this.setState({ openOverLay: false });

  setPhotos = (photos) => this.setState({ photos });

  componentDidMount() {
    // if user hasn't logged in, return to login page
    // in the future, we can use browser storage to keep user logged in
    if (!this.props.userActive?.id) {
      this.props.actions.push("/");
    } else if (this.props.albumId) {
      getData("/photos", {
        albumId: this.props.albumId,
      }).then((photos) => {
        this.setPhotos(photos);
        // close overlay
        this.closeOverLay();
      });
    }
  }

  render() {
    if (this.state.openOverLay)
      return <Overlay open={this.state.openOverLay} key="overlay" />;
    if (this.state.photos.length > 0) {
      return (
        <div>
          <h4
            onClick={() => this.props.actions.goBack()}
            className="backButton"
          >
            Back
          </h4>
          <div className="albumPhotoContainer">
            {this.state.photos.map((photo) => (
              <SingleAlbumPhoto photo={photo} key={photo.id} />
            ))}
          </div>
        </div>
      );
    }
    return <div>empty</div>;
  }
}

export default connect(stateToProps, dispatchToProps)(UserAlbum);
