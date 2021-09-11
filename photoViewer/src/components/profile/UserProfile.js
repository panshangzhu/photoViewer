import React, { Component } from "react";

// External
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal
import Overlay from "components/common/overlay/Overlay";
import {
  fetchUserAlbums,
  fetchUserPosts,
} from "redux/reducers/userProfileReducer/actions";
import {
  getUserAlbums,
  getUserPosts,
} from "redux/reducers/userProfileReducer/Selectors";
import UserProfileView from "./UserProfileView";

const stateToProps = (state) => ({
  userAlbums: getUserAlbums(state),
  userPosts: getUserPosts(state),
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchUserPosts,
      fetchUserAlbums,
    },
    dispatch
  ),
});

class UserProfile extends Component {
  state = {
    openOverLay: true,
  };

  closeOverLay = () => this.setState({ openOverLay: false });

  componentDidMount() {
    Promise.all([
      this.props.actions.fetchUserPosts(),
      this.props.actions.fetchUserAlbums(),
    ]).then(() => {
      console.log("here here");
      this.closeOverLay();
    });
  }

  render() {
    return [
      <Overlay open={this.state.openOverLay} key="overlay" />,
      <UserProfileView
        posts={this.props.userPosts}
        albums={this.props.userAlbums}
        key="userProfileView"
      />,
    ];
  }
}

export default connect(stateToProps, dispatchToProps)(UserProfile);
