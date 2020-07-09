import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

interface burger {
  ingredients: { [igKey: string]: number };
  // ingredients: any;
}

const burger = (props: burger) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        console.log(igKey + i);
        console.log(igKey);
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    // transformedIngredients masyvas todel pridedamas masyvo elementas
    transformedIngredients = [
      <p key={"1"}>Please start adding ingredients!</p>,
    ];
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
