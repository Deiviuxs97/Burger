import React, { ReactNode } from "react";

import classes from "./NavigationItem.module.css";

interface props {
  children: ReactNode;
  active?: boolean;
  link: string | undefined;
}
const navigationItem = (props: props) => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : undefined}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;
