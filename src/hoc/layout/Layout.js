import React from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios-order";
class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  menuHandle = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          clicked={this.menuHandle}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.token !== null,
  };
};

export default withErrorHandler(
  connect(mapStateToProps)(Layout),
  axiosInstance
);
