import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'kawax-js';
import VerifyData from '../components/VerifyData';
import CreateTransaction from '../components/CreateTransaction';
import SignData from '../actions/SignData';
import RecoverAddress from '../actions/RecoverAddress';
import CreateTx from '../actions/CreateTransaction';
import SignTx from '../actions/SignTransaction';
import SignTransaction from '../components/SignTransaction';

class EthProtocol extends React.Component {

  static stateToProps = ({ select }) => ({
    signature: select('signature'),
    hexData: select('hexData'),
    recoveredAddress: select('address'),
    transactionHash: select('createTransaction.TransactionCreated.transactionHash'),
    transactionAddressCreation: select('createTransaction.TransactionCreated.returnValues.from'),
    transactionId: select('createTransaction.TransactionCreated.returnValues.transactionId'),
    hashedDataPassedIn: select('createTransaction.LogMyHash.returnValues.theHash')
  });

  static propTypes = {
    signData: PropTypes.func.isRequired,
    signature: PropTypes.string,
    recoverAddress: PropTypes.func.isRequired,
    recoveredAddress: PropTypes.string,
    createTransaction: PropTypes.func.isRequired,
    transactionHash: PropTypes.string,
    transactionAddressCreation: PropTypes.string,
    transactionId: PropTypes.string,
    hashedDataPassedIn: PropTypes.string,
    signTransaction: PropTypes.func.isRequired
  };

  static dispatchToProps = {
    signData: SignData.export(),
    recoverAddress: RecoverAddress.export(),
    createTransaction: CreateTx.export(),
    signTransaction: SignTx.export()
  };

  static defaultProps = {
    signature: String(),
    recoverAddress: String(),
    transactionHash: String(),
    transactionAddressCreation: String(),
    transactionId: String()
  }

  render() {
    return (
      <div>
      <VerifyData
        signData={this.props.signData}
        signature={this.props.signature}
        hexData={this.props.hexData}
        recoverAddress={this.props.recoverAddress}
        recoveredAddress={this.props.recoveredAddress}
      />
      <CreateTransaction
        createTransaction={this.props.createTransaction}
        transactionHash={this.props.transactionHash}
        transactionAddressCreation={this.props.transactionAddressCreation}
        transactionId={this.props.transactionId}
        hashedDataPassedIn={this.props.hashedDataPassedIn}
      />
      <SignTransaction
        signTransaction={this.props.signTransaction}
      />
      </div>
    );
  }

}

export default Container(EthProtocol);
