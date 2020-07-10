import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

interface props {}

const logo = (props: { height: any }) => (
  <div style={{ height: props.height }}>
    <img src={burgerLogo} alt="myBurger" />
  </div>
);

export default logo;
