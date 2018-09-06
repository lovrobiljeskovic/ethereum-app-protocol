import React from 'react'
import { Component } from 'kawax-js'
import PropTypes from 'prop-types';
import {Input, Button} from 'reactstrap'

class CreateTransaction extends React.Component {

  state = {hexData: "", address: "", transactionId: ""}

  static propTypes = {
    createTransaction: PropTypes.func.isRequired,
    transactionHash: PropTypes.string,
    transactionAddressCreation: PropTypes.string,
    transactionId: PropTypes.string,
    hashedDataPassedIn: PropTypes.string,
  }

  static defaultProps = {
    transactionHash: String(),
    transactionAddressCreation: String(),
    transactionId: String(),
    hashedDataPassedIn: String()
  }

  onChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  createTransaction = async (event) => {
    event.preventDefault();
    this.props.createTransaction({
      hexData: this.state.hexData,
      address: this.state.address,
    });
  }

  render =() => {
    return (
      <div className="App">
        <div className="d-flex flex-column">
        <div className="col-sm-2">
        Hashed data:
          <Input
            className="form-control"
            id="hexData"
            onChange={this.onChange}
          />
        </div>
        <div className="col-sm-2">
        Address:
          <Input
            className="form-control"
            id="address"
            onChange={this.onChange}
          />
        </div>
        <p></p>
        <div className="col-sm-2">
        <Button type="button" className="btn btn-dark btn-sm-2" onClick={this.createTransaction}>Create a transaction</Button>
        <p>Transaction Hash: {this.props.transactionHash}</p>
        <p>Address which created transaction: {this.props.transactionAddressCreation}</p>
        <p>Transaction ID: {this.props.transactionId} </p>
        <p>Hash used for creating the transaction: {this.props.hashedDataPassedIn}</p>
        </div>
        </div>
      </div>
    );
  }

}

export default Component(CreateTransaction);
