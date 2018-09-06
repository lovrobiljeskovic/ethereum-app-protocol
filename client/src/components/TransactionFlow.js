import React from 'react'
import { Component } from 'kawax-js'
import PropTypes from 'prop-types';
import getWeb3 from '../utils/getWeb3'
import {Input, Button} from 'reactstrap'

/*

ETHEREUM PROTOCOL:

STEP 1) User inserts data which he wants to sign and an address which has to sign the data
STEP 2) User clicks on a get the signature and hashed data button
STEP 3) Sign button triggers signTx action which takes data and address as params and returns a signature along with hashed data
STEP 4) User clicks split the signature button
STEP 5) Split the signature button will trigger recoverAddress action which takes splitted signature(which we did prior to triggering an action)
        and returns an address which the ecrecover() function from smart contracted managed to recover from provided parts of a signature
        along with boolean if the data was propperly signed or not
*/

class TransactionFlow extends React.Component {
  state = {web3: null, data: "", address: ""}

  static propTypes = {
    signTx: PropTypes.func.isRequired,
    signature: PropTypes.string,
    hexData: PropTypes.string,
    recoverAddress: PropTypes.func.isRequired,
    recoveredAddress: PropTypes.string
  }

  static defaultProps = {
    signature: String(),
    hexData: String(),
    recoveredAddress: String()
  }

  addressRecovery = async () => {
    const web3 = await getWeb3();
    this.setState({ web3 })
    const signature = this.props.signature;
    const splitSignature = signature.substr(2);
    var r = '0x' + splitSignature.slice(0, 64)
    var s = '0x' + splitSignature.slice(64, 128)
    var v = '0x' + splitSignature.slice(128, 130)
    var vDecimal = web3.utils.hexToNumber(v)
    //v_decimal has to be either 27 or 28
    if (vDecimal !== 27 || vDecimal !== 28) {
      vDecimal += 27
    }
    this.props.recoverAddress({
      hexData: this.props.hexData,
      v: vDecimal,
      r: r,
      s: s
    })
  }

/*
  getPendingTx = () => {
    const {contract} = this.state
    const pending = contract.methods.getPendingTransactions().call()
    console.log("PENDING BOYOS", pending);
  }
*/

  onChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  getSignature = async (event) => {
    event.preventDefault();
    this.props.signTx({
      data: this.state.data,
      address: this.state.address,
    });
  }

  render =() => {
    return (
      <div className="App">
        <h1>Ethereum Protocol in the making</h1>
        <div className="d-flex flex-column">
        <div className="col-sm-2">
        Data to sign:
          <Input
            className="form-control"
            id="data"
            onChange={this.onChange}
            value={this.state.data}
          />
        </div>
        <div className="col-sm-2">
        Address to sign with:
          <Input
            className="form-control"
            id="address"
            onChange={this.onChange}
          />
        </div>
        <p></p>
        <div className="col-sm-2">
        <Button type="button" className="btn btn-dark btn-sm-2" onClick={this.signTransaction}>Get the signature and hashed data</Button>
        <p>SIGNATURE: {this.props.signature}</p>
        <p>HEX DATA: {this.props.hexData}</p>
        <Button type="button" className="btn btn-dark" onClick={this.splitSignature}>Sign</Button>
        <p>RECOVERED ADDRESS: {this.props.recoveredAddress}</p>
        </div>
        </div>
      </div>
    );
  }

}

export default Component(TransactionFlow);
