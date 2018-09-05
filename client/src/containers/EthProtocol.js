import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'kawax-js';
import SingingTransaction from '../components/SingingTransaction';
import SignTx from '../actions/SignTx';

class EthProtocol extends React.Component {

  static propTypes = {
    signTx: PropTypes.func.isRequired,
  };

  static dispatchToProps = {
    signTx: SignTx.export(),
  };

  render() {
    return (
      <SingingTransaction
        signTx={this.props.signTx}
      />
    );
  }

}

export default Container(EthProtocol);
