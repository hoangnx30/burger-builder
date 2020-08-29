import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Orders from "./container/Orders/Orders";
import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder";
import Checkout from "./container/Checkout";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout";

import * as authActions from "./redux/action/auth.action";

import "./App.module.css";

function App(props) {
  useEffect(() => {
    props.autoLoginWithToken();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/check-out" component={Checkout} />
        <Route path="/logout" component={Logout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLoginWithToken: () => dispatch(authActions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
