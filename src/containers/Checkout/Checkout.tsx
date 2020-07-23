import React, { Component } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { ingredientsBurgerBuilder } from "../BurgerBuilder/BurgerBuilder";

interface checkOutStateProps extends RouteComponentProps {
  ingredients: any;
  ings: ingredientsBurgerBuilder;
  price: any;
  history: any;
  location: any;
}

class Checkout extends Component<checkOutStateProps> {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedhandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
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
    return { summary };
  }
}

const mapStateToProps = (state: any) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
