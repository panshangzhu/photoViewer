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
} from "redux/reducers/UserPostReducer/actions";
import {
  getUserAlbums,
  getUserPosts,
} from "redux/reducers/UserPostReducer/Selectors";
import {
  getUserDetail,
  getUserNamesAndIds,
} from "redux/reducers/authReducer/Selectors";
import UserPostView from "./UserPostView";

const stateToProps = (state) => ({
  
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      push,
    },
    dispatch
  ),
});

class UserPost extends Component {
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
    
  }

  render() {
    const { userPosts, userAlbums, userActive, otherUsers } = this.props;
    return [
      <Overlay open={this.state.openOverLay} key="overlay" />,
      <UserPostView
        posts={userPosts}
        albums={userAlbums}
        userActive={userActive}
        otherUsers={otherUsers}
        key="UserPostView"
      />,
    ];
  }
}

export default connect(stateToProps, dispatchToProps)(UserPost);
