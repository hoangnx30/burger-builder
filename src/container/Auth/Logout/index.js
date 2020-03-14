import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as authAction from "../../../redux/action/auth.action";
class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogoutHandler();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutHandler: () => dispatch(authAction.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
