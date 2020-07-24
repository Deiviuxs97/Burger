import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

interface withErrorHandlerFunctions {
  eject: Function;
  use: Function;
}

interface withErrorHandlerInterceptors {
  response: withErrorHandlerFunctions;
  request: withErrorHandlerFunctions;
}

interface pop {}

interface axiosWithErrorHandler {
  interceptors: withErrorHandlerInterceptors;
}

const withErrorHandler = (
  WrappedComponent: Function,
  axios: axiosWithErrorHandler
) => {
  return class extends Component<pop> {
    state = {
      error: {
        message: "withErrorHandler",
      },
    };

    reqInterceptor?: pop;
    resInterceptor?: pop;

    componentWillMount() {
      console.log(this, " kas cia");
      this.reqInterceptor = axios.interceptors.request.use((req: pop) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res: pop) => {
          console.log(res, "res");
          return res;
        },
        (error: pop) => {
          console.log(error, "erroraas");
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.reqInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
