import React, { ReactNode } from "react";

import classes from "./BuildControl.module.css";

interface buildControl {
  disabled?: boolean | number;
  removed:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  added:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  label: ReactNode;
}

const buildControl = (props: buildControl) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled === true ? props.disabled : false}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
