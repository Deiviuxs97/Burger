import React, { Component } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { ingredientsBurgerBuilder } from "../BurgerBuilder/BurgerBuilder";

interface chechout{
  ingredients: ingredientsBurgerBuilder;
  purchased: boolean;
}

interface checkoutState {
  burgerBuilder: chechout;
  order: chechout;
}

interface checkOutStateProps {
  ingredients: ingredientsBurgerBuilder;
  ings: ingredientsBurgerBuilder;
  price: number;
  history: {replace: Function;
    goBack: Function;};
  location: Function;
  onInitPurchase: Function;
  purchased: boolean;
  match: {path:Function};
}

class Checkout extends Component<checkOutStateProps> {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state: checkoutState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
