import React from "react";
import { connect } from "react-redux";

import * as orderAction from "../../../redux/action/order.action";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

import axiosInstance from "../../../axios-order";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Name is invalid"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Street is invalid"
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 7
        },
        valid: false,
        touched: false,
        errorMessage: "Zipcode is invalid"
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Country is invalid"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "Email is invalid"
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    },
    formValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const ordersData = {};
    for (const key in this.state.orderForm) {
      ordersData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: ordersData,
      timeOrder: Date(Date.now())
    };
    debugger;
    this.props.onOrderSubmitHandler(order);
  };

  checkValidity(value, rules) {
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

  inputChangeHandler = (event, inputIdentifier) => {
    const updateStateOrderForm = { ...this.state.orderForm };
    const updateFormElement = { ...updateStateOrderForm[inputIdentifier] };
    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updateStateOrderForm[inputIdentifier] = updateFormElement;
    let formValid = true;
    for (const key in this.state.orderForm) {
      formValid = this.state.orderForm[key].valid && formValid;
    }
    this.setState({ orderForm: updateStateOrderForm, formValid: formValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(element => {
          return (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              changed={event => this.inputChangeHandler(event, element.id)}
              invalid={!element.config.valid}
              shouldValidation={element.config.elementType}
              touched={element.config.touched}
              errorMessage={element.config.errorMessage}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.isLoading) {
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

const mapStateToProps = state => {
  return {
    isLoading: state.orderState.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderSubmitHandler: orderData =>
      dispatch(orderAction.purchaseBurgerSuccessAsync(orderData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axiosInstance));
