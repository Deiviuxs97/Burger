import React from "react";

import classes from "./Button.module.css";

interface props {
  disabled?: boolean;
  btnType: React.Key;
  clicked?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  children: React.ReactNode;
}

const button = (props: props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
