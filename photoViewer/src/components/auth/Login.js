import React, { Component } from "react";

// External
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";

// Internal
import { updateUserName } from "redux/reducers/authReducer/actions";
import { dummyUserNames } from "./Constant";
import "./Login.css";

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      push,
      updateUserName,
    },
    dispatch
  ),
});

class Login extends Component {
  state = {
    userName: "",
    errorMessage: "",
  };

  // control input value
  setUserName = (event) => this.setState({ userName: event.target.value });

  // set Error Message to display
  setErrorMessage = (errorMessage) => this.setState({ errorMessage });

  // process login
  onLogin = () => {
    const { userName } = this.state;

    if (userName.length === 0) {
      this.setErrorMessage("Please enter user name!");
    } else if (!dummyUserNames.includes(userName)) {
      this.setErrorMessage("User name is not valid!");
    } else {
      // remember userName in redux for future use
      this.props.actions.updateUserName(userName);
      // Route to userProfile page
      this.props.actions.push(`/${userName}`);
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
            value={this.state.userName}
            onChange={this.setUserName}
          />
          {this.state.errorMessage && (
            <div className="errorMessage">{this.state.errorMessage}</div>
          )}
        </div>

        <button onClick={(e) => this.onLogin(e)}>Log in</button>
      </div>
    );
  }
}

export default connect(null, dispatchToProps)(Login);
