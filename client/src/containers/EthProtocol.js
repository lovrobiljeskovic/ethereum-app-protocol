import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'kawax-js';
import SingingTransaction from '../components/SingingTransaction';
import SignTx from '../actions/SignTx';

class EthProtocol extends React.Component {

  static stateToProps = ({ select }) => ({
    signature: select('signature.signature'),
  });

  static propTypes = {
    signTx: PropTypes.func.isRequired,
    signature: PropTypes.string
  };

  static dispatchToProps = {
    signTx: SignTx.export(),
  };

  static defaultProps = {
    signature: String()
  }

  render() {
    return (
      <SingingTransaction
        signTx={this.props.signTx}
        signature={this.props.signature}
      />
    );
  }

}

export default Container(EthProtocol);
