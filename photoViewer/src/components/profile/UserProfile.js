import React, { Component } from "react";

// External
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";

// Internal
import Overlay from "components/common/overlay/Overlay";
import {
  fetchUserAlbums,
  fetchUserPosts,
  resetPostsAlbums,
} from "redux/reducers/userProfileReducer/actions";
import { resetAuth } from "redux/reducers/authReducer/actions";
import {
  getUserAlbums,
  getUserPosts,
} from "redux/reducers/userProfileReducer/Selectors";
import {
  getActiveUser,
  getUserNamesAndIds,
} from "redux/reducers/authReducer/Selectors";
import UserProfileView from "./UserProfileView";

const stateToProps = (state) => ({
  userAlbums: getUserAlbums(state),
  userPosts: getUserPosts(state),
  userActive: getActiveUser(state),
  otherUsers: getUserNamesAndIds(state),
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchUserPosts,
      fetchUserAlbums,
      push,
      resetPostsAlbums,
      resetAuth,
    },
    dispatch
  ),
});

class UserProfile extends Component {
  state = {
    openOverLay: false,
  };

  closeOverLay = () => this.setState({ openOverLay: false });

  componentDidMount() {
    const { actions } = this.props;

    // if user hasn't logged in, return to login page
    // in the future, we can use browser storage to keep user logged in
    if (!this.props.userActive?.id) {
      actions.push("/");
    } else {
      Promise.all([actions.fetchUserPosts(), actions.fetchUserAlbums()]).then(
        () => {
          this.closeOverLay();
        }
      );
    }
  }

  componentWillUnmount() {
    this.props.actions.resetPostsAlbums();
  }

  onAlbumClick = (albumId) => {
    this.props.actions.push(`/${this.props.userActive.id}/${albumId}`);
  };

  onLogout = (e) => {
    const { actions } = this.props;
    e.preventDefault();
    actions.resetPostsAlbums();
    actions.resetAuth();
    actions.push("/");
  };

  render() {
    const { userPosts, userAlbums, userActive, otherUsers } = this.props;
    return [
      <Overlay open={this.state.openOverLay} key="overlay" />,
      <UserProfileView
        posts={userPosts}
        albums={userAlbums}
        userActive={userActive}
        otherUsers={otherUsers}
        onAlbumClick={this.onAlbumClick}
        onLogout={this.onLogout}
        key="userProfileView"
      />,
    ];
  }
}

export default connect(stateToProps, dispatchToProps)(UserProfile);
