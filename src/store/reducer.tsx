import * as actionTypes from "./actions";

interface ingredients {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}

interface wow {
  ingredientName: string;
  type: string;
}

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action: wow) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName as keyof ingredients]:
            state.ingredients[action.ingredientName as keyof ingredients] + 1,
        },
        totalPrice:
          state.totalPrice +
          INGREDIENT_PRICES[action.ingredientName as keyof ingredients],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName as keyof ingredients]:
            state.ingredients[action.ingredientName as keyof ingredients] - 1,
        },
        totalPrice:
          state.totalPrice -
          INGREDIENT_PRICES[action.ingredientName as keyof ingredients],
      };
    default:
      return state;
  }
};

export default reducer;
