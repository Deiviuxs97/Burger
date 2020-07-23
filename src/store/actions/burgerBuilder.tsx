import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { ingredients } from "../reducers/burgerBuilder";

export const addIngredient = (
  name: string
): actionTypes.AddIngredientAction => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (
  name: string
): actionTypes.RemoveIngredientAction => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (
  ingredients: ingredients
): actionTypes.SetIngredientAction => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = (): actionTypes.FetchIngredientAction => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch: any) => {
    axios
      .get("https://react-my-burger-1c0e3.firebaseio.com/ingredients.json")
      .then((response) => {
        console.log(response, "asaa");
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
