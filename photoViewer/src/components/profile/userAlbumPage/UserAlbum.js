import React, { Component } from "react";

// External
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push, goBack } from "connected-react-router";

// Internal
import { getData } from "api/Api";
import Overlay from "components/common/overlay/Overlay";
import { getActiveUser } from "redux/reducers/authReducer/Selectors";
import { getUserAlbums } from "redux/reducers/userProfileReducer/Selectors";
import SingleAlbumPhoto from "./SingleAlbumPhoto";
import "./UserAlbum.css";

const stateToProps = (state) => ({
  userActive: getActiveUser(state),
  userAlbums: getUserAlbums(state),
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
    albumInfo: {},
  };

  closeOverLay = () => this.setState({ openOverLay: false });

  setPhotos = (photos) => this.setState({ photos });
  setAlbumInfo = (albumInfo) => this.setState({ albumInfo });

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

        // get Album info
        this.getAlbumInfo(photos[0].albumId);
        // close overlay
        this.closeOverLay();
      });
    }
  }

  getAlbumInfo = (albumId) => {
    // if albums info has stored in redux (which mean the page is directed from main page)
    if (this.props.userAlbums.length > 0) {
      console.log("albumId", this.props.userAlbums);
      this.setAlbumInfo(
        this.props.userAlbums.find((album) => album.id === albumId)
      );
    } else {
      getData("/albums", {
        id: albumId,
      })
        .then((album) => this.setAlbumInfo(album[0]))
        .catch((err) => window.alert(err));
    }
  };

  render() {
    if (this.state.openOverLay) return <Overlay open key="overlay" />;
    if (this.state.photos.length > 0) {
      return (
        <div>
          <h4
            onClick={() => this.props.actions.goBack()}
            className="backButton"
          >
            Back
          </h4>
          <h3 className="albumName">Album title: {this.state.albumInfo.title}</h3>

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
