import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router";

const Login = lazy(() =>
  import("./components/auth/Login")
);
const UserProfile = lazy(() => import("./components/profile/UserProfile"))

export default class Router extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route
            path="/:userName"
            render={({ match }) => <UserProfile id={match.params.userName} />}
          />
        </Switch>
      </Suspense>
    );
  }
}
