import React from "react";

import classes from "./Button.module.css";

interface props {
  btnType: React.Key;
  clicked:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  children: React.ReactNode;
}

const button = (props: props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
