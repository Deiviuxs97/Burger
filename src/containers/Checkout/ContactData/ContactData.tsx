import React, { Component } from "react";
import { connect } from "react-redux";

import { RouteComponentProps } from "react-router-dom";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { ingredientsBurgerBuilder } from "../../BurgerBuilder/BurgerBuilder";
import Input from "../../../components/UI/Input/Input";

interface OrderForms {
  name: InputTypeInput;
  email: string;
  street: string;
  zipCode: number;
  // deliveryMethod: string;
}

interface InputTypeInput {
  elementConfig: InputElementConfig;
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

interface Input {
  elementType: string;
  isValid: boolean;
  value: string;
  hasTouched: boolean;
  ShouldValidation: boolean;
}

export interface InputTypeSelect extends Input {
  elementConfig: {};
  validation: {
    required: boolean;
  };
}

export interface InputElementConfig {
  type: string;
  placeholder: string;
}

interface contactDataProps extends RouteComponentProps {
  price: number;
  ingredients: ingredientsBurgerBuilder;
  ings: any;
}

interface contactDataState {
  orderForm: {};
  formIsValid: {};
  loading: boolean;
}

interface ContactDataEvent {
  preventDefault: Function;
}

class ContactData extends Component<contactDataProps, contactDataState> {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event: ContactDataEvent) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData: { [element: string]: string } = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[
        formElementIdentifier as keyof OrderForms
      ] = this.state.orderForm[formElementIdentifier as keyof OrderForms].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
  };

  checkValidity(value: string, rules: InputTypeInput) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputIdentifier: string
  ) => {
    const updatedOrderForm: any = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key as keyof OrderForms],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(
              event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
            ) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Succes" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
export default connect(mapStateToProps)(ContactData);
