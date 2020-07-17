import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { ingredientsBurgerBuilder } from "../BurgerBuilder/BurgerBuilder";

interface orderStatePro {
  orders: [
    {
      id: number;
      ingredients: ingredientsBurgerBuilder;
      price: number;
    }
  ];
  loading: boolean;
}

interface ordersOrder {
  price: string;
  ingredients: ingredientsBurgerBuilder;
  id: string | number | undefined;
}

class Orders extends Component<orderStatePro> {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order: ordersOrder) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
