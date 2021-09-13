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
import { logout } from "redux/reducers/authReducer/actions";
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
  allUsers: getUserNamesAndIds(state),
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchUserPosts,
      fetchUserAlbums,
      push,
      resetPostsAlbums,
      logout,
    },
    dispatch
  ),
});

class UserProfile extends Component {
  state = {
    openOverLay: false,
  };

  updateOverLay = (open) => this.setState({ openOverLay: open });

  componentDidMount() {
    const { actions, userId } = this.props;

    // if user hasn't logged in, return to login page
    // in the future, we can use browser storage to keep user logged in
    if (!this.props.userActive?.id) {
      actions.push("/");
    } else {
      Promise.all([
        actions.fetchUserPosts(userId),
        actions.fetchUserAlbums(userId),
      ])
        .then(() => {
          this.updateOverLay(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { userId, actions } = this.props;
    if (prevProps.userId !== userId) {
      this.updateOverLay(true);
      Promise.all([
        actions.fetchUserPosts(userId),
        actions.fetchUserAlbums(userId),
      ])
        .then(() => {
          this.updateOverLay(false);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  componentWillUnmount() {
    this.props.actions.resetPostsAlbums();
  }

  onAlbumClick = (albumId) => {
    this.props.actions.push(`/album${albumId}`);
  };

  onPostClick = (postId) => {
    this.props.actions.push(`/post${postId}`);
  };

  onUserClick = (userId) => {
    this.props.actions.push(`/${userId}`);
  };

  onLogout = (e) => {
    const { actions } = this.props;
    e.preventDefault();
    actions.logout();
  };

  render() {
    const { userPosts, userAlbums, userActive, allUsers, userId } = this.props;
    return [
      <Overlay open={this.state.openOverLay} key="overlay" />,
      <UserProfileView
        posts={userPosts}
        albums={userAlbums}
        userActive={userActive}
        allUsers={allUsers}
        userId={userId}
        onAlbumClick={this.onAlbumClick}
        onPostClick={this.onPostClick}
        onUserClick={this.onUserClick}
        onLogout={this.onLogout}
        key="userProfileView"
      />,
    ];
  }
}

export default connect(stateToProps, dispatchToProps)(UserProfile);
