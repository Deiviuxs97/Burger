import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { RouteComponentProps } from "react-router-dom";
import { any } from "prop-types";

interface ingr {
  [igKey: string]: number;
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}

interface checkOutStateProps {
  ingredients?: ingr;
  history?: any;
  location?: any;
  price?: number;
  match?: any;
}

class Checkout extends Component<checkOutStateProps> {
  state = {
    ingredients: {} as ingr,
    price: 0,
    totalPrice: any,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: { [key: string]: number } = {};
    let price: number | string = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
      // ["salad", "1"]
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedhandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedhandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
