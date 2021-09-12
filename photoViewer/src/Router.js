import UserAlbum from "components/profile/userAlbumPage.js/UserAlbum";
import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router";

const Login = lazy(() => import("./components/auth/Login"));
const UserProfile = lazy(() => import("./components/profile/UserProfile"));

export default class Router extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/:userId([0-9]+)" render={() => <UserProfile />} />
          <Route
            exact
            path="/:userName([0-9]+)/:albumId([0-9]+)"
            render={({ match }) => <UserAlbum albumId={match.params.albumId} />}
          />
        </Switch>
      </Suspense>
    );
  }
}
