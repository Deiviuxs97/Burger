import { ingredients } from "../reducers/burgerBuilder";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";

export interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  ingredientName: string;
}

export interface RemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  ingredientName: string;
}

export interface SetIngredientAction {
  type: typeof SET_INGREDIENTS;
  ingredients: ingredients;
}

export interface FetchIngredientAction {
  type: typeof FETCH_INGREDIENTS_FAILED;
}

export type action =
  | AddIngredientAction
  | RemoveIngredientAction
  | SetIngredientAction
  | FetchIngredientAction;
