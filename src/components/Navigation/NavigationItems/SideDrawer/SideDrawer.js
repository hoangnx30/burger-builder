import React from "react";

import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems";
import classes from "./SideDrawer.module.css";
const sideDrawer = props => {
  return (
    <div className={classes.SideDrawer}>
      <Logo />
      <nav>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </div>
  );
};
export default sideDrawer;
