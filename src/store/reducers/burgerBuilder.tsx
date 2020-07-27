import * as actionTypes from "../actions/actionTypes";
import { action } from "../actions/actionTypes";
import { updateObject } from "../utility";
import { ingredientsBurgerBuilder } from "../../containers/BurgerBuilder/BurgerBuilder";

interface burgerBuilderActio {
}

interface burgerBuilderAction {
  ingredients: ingredientsBurgerBuilder;
}

interface burgerBuilderActions {
  ingredientName: string;
}

interface reducerStateProps {
  ingredients: any;
  totalPrice: number;
  error: boolean;
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES: ingredientsBurgerBuilder = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (
  state: reducerStateProps,
  action: burgerBuilderActions
) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (
  state: reducerStateProps,
  action: burgerBuilderActions
) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state: reducerStateProps, action: burgerBuilderAction) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: true,
  });
};

const fetchIngredientsFailed = (state: reducerStateProps, action: burgerBuilderActio) => {
  return updateObject(state, { error: true });
};

const reducer = (state: reducerStateProps = initialState, action: action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
