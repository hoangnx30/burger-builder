import React from "react";
import burgerLogo from "../../assets/burger-logo.png";
import classes from "./Logo.module.css";
const Logo = props => {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img alt="" src={burgerLogo} />
    </div>
  );
};

export default Logo;
