import React from "react";
import { checkPropTypes } from "prop-types";
import classes from "./DrawerToggle.module.css";

interface props {
  clicked?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const drawerToggle = (props: props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
