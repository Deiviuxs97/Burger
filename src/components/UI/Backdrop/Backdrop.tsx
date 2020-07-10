import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = (props: {
  show: boolean;
  clicked:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
