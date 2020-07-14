import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

interface pop {
  show: any;
}

const withErrorHandler = (WrappedComponent: any, axios: any) => {
  return class extends Component {
    state = {
      error: {
        message: "",
      },
    };
    reqInterceptor: any;
    resInterceptor: any;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req: pop) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res: pop) => res,
        (error: pop) => {
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
