import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { ingredientsBurgerBuilder } from "../BurgerBuilder/BurgerBuilder";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

interface orders{
  order: {
    orders: string;
    loading: boolean;
  };
}

interface orderStatePro {
  orders: [
    {
      id: number;
      ingredients: ingredientsBurgerBuilder;
      price: number;
    }
  ];
  loading: boolean;
  onFetchOrders: Function;
}

interface ordersOrder {
  price: any;
  ingredients: ingredientsBurgerBuilder;
  id: string | number | undefined;
}

class Orders extends Component<orderStatePro> {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders: any = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order: ordersOrder) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state: orders) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
