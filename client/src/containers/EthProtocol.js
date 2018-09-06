import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'kawax-js';
import TransactionFlow from '../components/TransactionFlow';
import SignTx from '../actions/SignTx';
import RecoverAddress from '../actions/RecoverAddress';

class EthProtocol extends React.Component {

  static stateToProps = ({ select }) => ({
    signature: select('signature'),
    hexData: select('hexData'),
    recoveredAddress: select('address')
  });

  static propTypes = {
    signTx: PropTypes.func.isRequired,
    signature: PropTypes.string,
    recoverAddress: PropTypes.func.isRequired,
    recoveredAddress: PropTypes.string,
  };

  static dispatchToProps = {
    signTx: SignTx.export(),
    recoverAddress: RecoverAddress.export()
  };

  static defaultProps = {
    signature: String(),
    recoverAddress: String()
  }

  render() {
    return (
      <TransactionFlow
        signTx={this.props.signTx}
        signature={this.props.signature}
        hexData={this.props.hexData}
        recoverAddress={this.props.recoverAddress}
        recoveredAddress={this.props.recoveredAddress}
      />
    );
  }

}

export default Container(EthProtocol);
