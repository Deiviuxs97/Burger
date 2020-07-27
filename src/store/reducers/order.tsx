import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

interface tryNot {
  concat: Function;
}

interface ordersInterface {
  orders: tryNot;
}

interface actionInterface {
  type: tryNot;
  orders: number;
  orderData: number;
  orderId: number;
}

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state: ordersInterface, action: actionInterface) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (
  state: ordersInterface,
  action: actionInterface
) => {
  return updateObject(state, { purchased: true });
};

const purchaseBurgerSuccess = (
  state: ordersInterface,
  action: actionInterface
) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (
  state: ordersInterface,
  action: actionInterface
) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state: ordersInterface, action: actionInterface) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (
  state: ordersInterface,
  action: actionInterface
) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersFail = (state: ordersInterface, action: actionInterface) => {
  return updateObject(state, { loading: false });
};

const reducer = (
  state: ordersInterface = initialState,
  action: actionInterface
) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
