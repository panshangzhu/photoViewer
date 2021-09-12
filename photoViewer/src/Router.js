import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router";

const Login = lazy(() => import("./components/auth/Login"));
const UserProfile = lazy(() => import("./components/profile/UserProfile"));
const UserAlbum = lazy(() => import("./components/profile/userAlbumPage/UserAlbum"))
const UserPost = lazy(() => import("./components/profile/userPostPage/UserPost"))

export default class Router extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/:userId([0-9]+)" render={({ match }) => <UserProfile userId={match.params.userId} />} />
          <Route
            exact
            path="/album:albumId([0-9]+)"
            render={({ match }) => <UserAlbum albumId={match.params.albumId} />}
          />
          <Route
            exact
            path="/post:postId([0-9]+)"
            render={({ match }) => <UserPost postId={match.params.postId} />}
          />
        </Switch>
      </Suspense>
    );
  }
}
