export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export interface AddIngredientAction {
  type: string;
  ingredientName: string;
}

export interface RemoveIngredientAction {
  type: string;
  ingredientName: string;
}

export interface SetIngredientAction {
  type: string;
  ingredients: string;
}

export interface FetchIngredientAction {
  type: string;
}
