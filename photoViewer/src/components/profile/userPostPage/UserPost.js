import React, { Component } from "react";

// External
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push, goBack } from "connected-react-router";

// Internal
import { getData, postData } from "api/Api";
import { logout } from "redux/reducers/authReducer/actions";
import Overlay from "components/common/overlay/Overlay";
import {
  getActiveUser,
  getUserNamesAndIds,
} from "redux/reducers/authReducer/Selectors";

import "./UserPost.css";

const stateToProps = (state) => ({
  userActive: getActiveUser(state),
  users: getUserNamesAndIds(state),
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      push,
      goBack,
      logout,
    },
    dispatch
  ),
});

class UserPost extends Component {
  state = {
    openOverLay: false,
    comments: [],
    post: null,
    newCommentTitle: "",
    newCommentBody: "",
    newCommentFrom: "",
    postOwner: {},
  };

  closeOverLay = () => this.setState({ openOverLay: false });

  setComments = (comments) => this.setState({ comments });
  setPost = (post) => this.setState({ post });
  setPostOwner = (postOwner) => this.setState({ postOwner });

  setNewCommentTitle = (e) =>
    this.setState({ newCommentTitle: e.target.value });
  setNewCommentBody = (e) => this.setState({ newCommentBody: e.target.value });
  setNewCommentFrom = (e) => this.setState({ newCommentFrom: e.target.value });

  componentDidMount() {
    // if user has logged in, prefill the email, otherwise, keep email field empty
    if (this.props.userActive?.email) {
      this.setState({
        newCommentFrom: this.props.userActive.email,
      });
    }
    if (this.props.postId) {
      Promise.all([
        getData("/posts", {
          id: this.props.postId,
        }),
        getData("/comments", {
          postId: this.props.postId,
        }),
      ])
        .then((response) => {
          // store post data and comments data
          this.setPost(response[0][0]);
          this.setComments(response[1]);

          // get postOwner
          this.getPostOwner(response[0][0].userId);

          // close overlay
          this.closeOverLay();
        })
        .catch((err) => window.alert(err));
    }
  }

  getPostOwner = (userId) => {
    // when a user logs in, we store users in redux, so no need to call api to get postOwner info
    if (this.props.users.length > 0) {
      this.setPostOwner(this.props.users.find((user) => user.id === userId));
    } else {
      // if no user logged in, call api to get postOwner info
      getData("/users", {
        id: userId,
      })
        .then((postOwner) => this.setPostOwner(postOwner[0]))
        .catch((err) => window.alert(err));
    }
  };

  backClick = () => {
    if (this.props.userActive?.id) {
      this.props.actions.goBack();
    } else {
      // back to login page
      this.props.actions.push("/");
    }
  };

  // simple method used to test email, we can also replace it to UTILS
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateEmail(this.state.newCommentFrom)) {
      window.alert("Email is not valid");
    } else if (
      this.state.newCommentTitle.length === 0 ||
      this.state.newCommentBody.length === 0
    ) {
      window.alert("Title and comment cannot be empty");
    } else {
      // post comment data
      postData("/comments", {
        postId: this.props.postId,
        name: this.state.newCommentTitle,
        body: this.state.newCommentBody,
        email: this.state.newCommentFrom,
      }).then(() => {
        // tell user the comment has updated
        window.alert(
          `Your Comment Has Posted,
           title: ${this.state.newCommentTitle},
           comment: ${this.state.newCommentBody}`
        );
        //  reset state
        this.setState({
          newCommentTitle: "",
          newCommentBody: "",
          newCommentFrom: "",
        });
      });
    }
  };

  render() {
    if (this.state.openOverLay) return <Overlay open key="overlay" />;
    if (this.state.post) {
      const { post, comments } = this.state;
      return (
        <>
          <div className="postUserHeader">
            {/* MetaTags for SEO */}
            <MetaTags>
              <title>FlightHub User Posts</title>
              <meta name="description" content="FlightHub Photo Viewer Posts" />
              <meta property="og:title" content="FlightHub Posts" />
              <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
            </MetaTags>
            <h3 onClick={this.backClick} className="backButton">
              {/* if user has logged in, we display Back To List */}
              {!this.props.userActive ||
              Object.keys(this.props.userActive).length === 0
                ? "Back to login"
                : "Back to list"}
            </h3>
            <h3>
              <span className="titleStrong">Post of : </span>{" "}
              {this.state.postOwner?.name}
            </h3>
            <div className="postUserInfo">
              <h5>
                {this.props.userActive?.name
                  ? `You have logged in as ${this.props.userActive.name}`
                  : "You haven't Loggedin"}
              </h5>
              {this.props.userActive?.name && (
                <button
                  className="logout"
                  onClick={() => this.props.actions.logout()}
                >
                  log out
                </button>
              )}
            </div>
          </div>

          <div className="userPostContainer">
            <h1>
              Title: <span className="userPostTitle">{post.title}</span>
            </h1>
            <div className="userPostBody">{post.body}</div>
            <div className="userPostComments">
              <h3>Comments : </h3>
              {comments.map((comment) => (
                <div className="commentContainer" key={comment.id}>
                  <div>
                    <h5>
                      <span className="titleStrong">Title</span> :{" "}
                      {comment.name}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      <span className="titleStrong">Comment</span> :{" "}
                      {comment.body}
                    </h5>
                  </div>
                  <div className="from">
                    <h5>
                      <span className="titleStrong">From</span> :{" "}
                      {comment.email}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
            <div className="newCommentContainer">
              {this.props.userActive.id === post.userId ? (
                <h3>You cannot comment on your own post</h3>
              ) : (
                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <h3>Leave Your Comment</h3>
                  <p>Title :</p>
                  <input
                    type="text"
                    name="newCommentTitle"
                    value={this.state.newCommentTitle}
                    onChange={this.setNewCommentTitle}
                  />
                  <p>Comment :</p>
                  <textarea
                    type="text"
                    name="newCommentBody"
                    value={this.state.newCommentBody}
                    onChange={this.setNewCommentBody}
                    rows="4"
                    cols="50"
                  />
                  <p>Email :</p>
                  <input
                    type="text"
                    name="newCommentFrom"
                    value={this.state.newCommentFrom || ""}
                    onChange={this.setNewCommentFrom}
                  />
                  <div>
                    <button type="submit">
                      <h3>COMMENT</h3>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      );
    }
    return <div>empty</div>;
  }
}

export default connect(stateToProps, dispatchToProps)(UserPost);
