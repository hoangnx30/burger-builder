import React from "react";
import { Route, Switch } from "react-router-dom";

import Orders from "./container/Orders/Orders";
import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder";
import Checkout from "./container/Checkout";
import Auth from "./container/Auth/Auth";

import "./App.module.css";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/check-out" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
