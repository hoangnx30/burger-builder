import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      axios.interceptors.request.use(request => {
        return request;
      });

      axios.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          this.setState({ error: error });
        }
      );
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
