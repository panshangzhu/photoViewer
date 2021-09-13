import React, { Component } from "react";

// External
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";

// Internal
import { updateActiveUser, getUsers } from "redux/reducers/authReducer/actions";
import { getUserNamesAndIds } from "redux/reducers/authReducer/Selectors";
import "./Login.css";

const stateToProps = (state) => ({
  authUsers: getUserNamesAndIds(state),
});

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      push,
      updateActiveUser,
      getUsers,
    },
    dispatch
  ),
});

class Login extends Component {
  state = {
    username: "",
    errorMessage: "",
  };

  // control input value
  setUsername = (event) => this.setState({ username: event.target.value });

  // set Error Message to display
  setErrorMessage = (errorMessage) => this.setState({ errorMessage });

  // fetch users for authentication use
  componentDidMount() {
    this.props.actions.getUsers();
  }

  // process login
  onLogin = () => {
    const { username } = this.state;
    const usernames = this.props.authUsers.map((user) => user.username);

    if (username.length === 0) {
      this.setErrorMessage("Please enter user name!");
    } else if (!usernames.includes(username)) {
      this.setErrorMessage("User name is not valid!");
    } else {
      const activeUser =
        this.props.authUsers.find(
          (user) => user.username === this.state.username
        ) || {};
      // remember active User in redux for future use
      this.props.actions.updateActiveUser(activeUser);
      // Route to userProfile page
      this.props.actions.push(`/${activeUser.id}`);
    }
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="title">Photo Viewer</div>
        <div className="inputContainer">
          <h6 id="userNameLabel">User Name</h6>
          <input
            type="text"
            className="userNameInput"
            value={this.state.username}
            onChange={this.setUsername}
          />
          {this.state.errorMessage && (
            <div className="errorMessage">{this.state.errorMessage}</div>
          )}
        </div>

        <button onClick={(e) => this.onLogin(e)} className="loginButton">
          Log in
        </button>
      </div>
    );
  }
}

export default connect(stateToProps, dispatchToProps)(Login);
