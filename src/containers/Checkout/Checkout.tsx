import React, { Component } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { ingredientsBurgerBuilder } from "../BurgerBuilder/BurgerBuilder";

interface checkOutStateProps extends RouteComponentProps {
  ingredients?: ingredientsBurgerBuilder;
  ings: any;
  price: number;
}

class Checkout extends Component<checkOutStateProps> {
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
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedhandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
