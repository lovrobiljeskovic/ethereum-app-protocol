import React from 'react'
import { Component } from 'kawax-js'
import PropTypes from 'prop-types';
import {Input, Button} from 'reactstrap'

class SignTransaction extends React.Component {
  state = {transactionId: "", address: ""}

  static propTypes = {
    signTransaction: PropTypes.func.isRequired
  }

  onChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  signTransaction = async (event) => {
    event.preventDefault();
    this.props.signTransaction({
      transactionId: this.state.transactionId,
      address: this.state.address
    })
  }

  render = () =>{
    return(
      <div className="d-flex flex-column">
      <div className="col-sm-2">
      Transaction ID:
        <Input
          className="form-control"
          id="transactionId"
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
      <Button type="button" className="btn btn-dark btn-sm-2" onClick={this.signTransaction}>Sign a transaction</Button>
      {/* <p>Transaction Hash: {this.props.transactionHash}</p>
      <p>Address which created transaction: {this.props.transactionAddressCreation}</p>
      <p>Transaction ID: {this.props.transactionId} </p>
      <p>Hash used for creating the transaction: {this.props.hashedDataPassedIn}</p> */}
      </div>
      </div>
    )
  }

}

export default Component(SignTransaction);
