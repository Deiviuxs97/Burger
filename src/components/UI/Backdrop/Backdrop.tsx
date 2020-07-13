import React from "react";

import classes from "./Backdrop.module.css";

interface props {
  show?: boolean;
  clicked?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}
const backdrop = (props: props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
