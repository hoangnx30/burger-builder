import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import Logout from "./container/Auth/Logout";

import * as authActions from "./redux/action/auth.action";
import AsyncComponent from "./hoc/asyncComponents/AsyncComponents";

import "./App.module.css";

// const asyncCheckOut = AsyncComponent(() => {
//   return import("./container/Checkout");
// });

const asyncCheckOut = lazy(() => import("./container/Checkout"));

// const asyncOrder = AsyncComponent(() => {
//   return import("./container/Orders/Orders");
// });

const asyncOrder = lazy(() => import("./container/Orders/Orders"));
// const asyncAuth = AsyncComponent(() => {
//   return import("./container/Auth/Auth");
// });

const asyncBurgerBuilder = AsyncComponent(() => {
  return import("./container/BurgerBuilder");
});
const asyncAuth = lazy(() => import("./container/Auth/Auth"));

function App(props) {
  useEffect(() => {
    props.autoLoginWithToken();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={asyncBurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/check-out" component={asyncCheckOut} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/orders" component={asyncOrder} />
        <Route path="/" exact component={asyncBurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Layout>{routes}</Layout>
    </Suspense>
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
