import * as actionTypes from "../actions/actionTypes";
import { action } from "../actions/actionTypes";

export interface ingredients {
  [key: string]: number;
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}

export interface IngredientPriceProps {
  [key: string]: number;
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}

interface reducerStateProps {
  ingredients: ingredients;
  totalPrice: number;
  error: boolean;
}

const initialState = {
  ingredients: {} as ingredients,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES: IngredientPriceProps = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state: reducerStateProps = initialState, action: action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;