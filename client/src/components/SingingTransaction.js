import React from 'react'
import { Component } from 'kawax-js'
import PropTypes from 'prop-types';
import getWeb3 from '../utils/getWeb3'
import getContractInstance from '../utils/getContractInstance'
import contractDefinition from '../contracts/Verifier.json'
import {Input, Button} from 'reactstrap'

class SigningTransaction extends React.Component {
  state = {web3: null, contract: null, accounts: null, data: "", address: ""}

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

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      // Get the contract instance by passing in web3 and the contract definition.
      const contract = await getContractInstance(web3, contractDefinition)

      this.setState({ web3, accounts, contract }, this.signTx)
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.log(error)
    }
  }

  splitSignature = async () => {
    const web3 = await getWeb3();
    this.setState({ web3 })
    const signature = this.props.signature;
    console.log("SIGNATURE?????", this.props.signature);
    const splitSignature = signature.substr(2);
    var r = '0x' + splitSignature.slice(0, 64)
    console.log("R", r);
    var s = '0x' + splitSignature.slice(64, 128)
    console.log("S", s);
    var v = '0x' + splitSignature.slice(128, 130)
    console.log("V", v);
    var vDecimal = web3.utils.hexToNumber(v)
    //v_decimal has to be either 27 or 28
    if (vDecimal != 27 || vDecimal != 28) {
      vDecimal += 27
    }
    console.log("VDEC", vDecimal);
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

  signTx = async () => {
    const { accounts, contract, web3} = this.state
    const msg = 'henlo frendo'
    const hex_msg = web3.utils.sha3(msg)
    let signature = await web3.eth.sign(hex_msg, accounts[0])
    console.log(`address -----> ${this.state.accounts}`)
    console.log(`msg ---------> ${msg}`)
    console.log(`hex(msg) ----> ${hex_msg}`)
    console.log(`sig ---------> ${signature}`)

    signature = signature.substr(2);
    const r = '0x' + signature.slice(0, 64)
    const s = '0x' + signature.slice(64, 128)
    const v = '0x' + signature.slice(128, 130)
    var v_decimal = web3.utils.toDecimal(v)
    if(v_decimal != 27 || v_decimal != 28) {
      v_decimal += 27
    }

    console.log(`r -----------> ${r}`)
    console.log(`s -----------> ${s}`)
    console.log(`v -----------> ${v}`)
    console.log(`vd ----------> ${v_decimal}`)

    contract.options.gas = 5000000;
    const response = await contract.methods.recoverAddr(hex_msg, v_decimal, r, s).call()
    const signed = await contract.methods.isSigned(response, hex_msg, v_decimal, r, s).call()
    //const create = await contract.methods.createTransaction(hex_msg).send({from: accounts[0]}).then(console.log)
    //const sign1 = await contract.methods.signTransaction(0).send({from: accounts[1]}).then(console.log)
    //const sign2 = await contract.methods.signTransaction(0).send({from: accounts[2]}).then(console.log)

    console.log('-----data------'),
    console.log(`input addr ==> ${this.state.accounts[0]}`),
    console.log(`output addr => ${response}`)
    console.log(`is signed => ${signed}`)
  };

  onChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.signTx({
      data: this.state.data,
      address: this.state.address,
    });
  }

  render =() => {
    /*
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    */
    return (
      <div className="App">
        <h1>Ethereum Protocol in the making</h1>
        <div className="form-row">
        <div className="col">
        Data to sign:
          <Input
            className="form-control"
            id="data"
            onChange={this.onChange}
            value={this.state.data}
          />
        </div>
        <div className="col">
        Address to sign with:
          <Input
            className="form-control"
            id="address"
            onChange={this.onChange}
          />
        </div>
        </div>
        <Button onClick={this.handleSubmit}>Sign</Button>
        <p>SIGNATURE: {this.props.signature}</p>
        <p>HEX DATA: {this.props.hexData}</p>
        <Button onClick={this.splitSignature}>Split the signature</Button>
        <p>RECOVERED ADDRESS: {this.props.recoveredAddress}</p>
      </div>
    );
  }

}

export default Component(SigningTransaction);
