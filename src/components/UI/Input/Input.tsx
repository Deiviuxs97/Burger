import React, { ReactNode } from "react";

import classes from "./Input.module.css";
interface inputOptionsProps {
  displayValue: ReactNode;
  value: string | number | undefined;
}

interface inputProps {
  [x: string]: ReactNode;
  value: string | number | readonly string[] | undefined;
  elementConfig: any;
  changed: any;
  elementType: string;
  touched: boolean;
  shouldValidate: any;
  invalid: boolean;
}

const input = (props: inputProps) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option: inputOptionsProps) => (
            <option
              key={option.value}
              value={option.value}
              onChange={props.changed}
            >
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
