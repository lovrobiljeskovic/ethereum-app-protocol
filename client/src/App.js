import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import getContractInstance from './utils/getContractInstance'
import contractDefinition from './contracts/Verifier.json'

class App extends Component {
  state = {web3: null, contract: null, accounts: null }

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

  getPendingTx = () => {
    const {contract} = this.state
    const pending = contract.methods.getPendingTransactions().call()
    console.log("PENDING BOYOS", pending);
  }

  signTx = async () => {
    const { accounts, contract, web3} = this.state
    const msg = 'henlo frendo'
    const hex_msg = web3.utils.sha3(msg)
    let signature1= await web3.eth.sign(hex_msg, accounts[0])
    let signature2 = await web3.eth.sign(hex_msg, accounts[1])
    console.log(`address -----> ${this.state.accounts}`)
    console.log(`msg ---------> ${msg}`)
    console.log(`hex(msg) ----> ${hex_msg}`)
    console.log(`sig ---------> ${signature1}`)
    console.log(`sig ---------> ${signature2}`)

    signature1 = signature1.substr(2);
    var r1 = '0x' + signature1.slice(0, 64)
    var s1 = '0x' + signature1.slice(64, 128)
    var v1 = '0x' + signature1.slice(128, 130)
    var v_decimal1 = this.state.web3.utils.toDecimal(v1)
    //v_decimal has to be either 27 or 28
    if (v_decimal1 != 27 || v_decimal1 != 28) {
      v_decimal1 += 27
    }

    signature2 = signature2.substr(2);
    var r2 = '0x' + signature2.slice(0, 64)
    var s2 = '0x' + signature2.slice(64, 128)
    var v2 = '0x' + signature2.slice(128, 130)
    var v_decimal2 = this.state.web3.utils.toDecimal(v2)
    //v_decimal has to be either 27 or 28
    if (v_decimal2 != 27 || v_decimal2 != 28) {
      v_decimal2 += 27
    }


    // let sigV = []
    // let sigR = []
    // let sigS = []

    // sigV.push(v_decimal);
    // sigR.push(r);
    // sigS.push(s);

    // console.log("SIGV", sigV)
    // console.log("SIGR", sigR)
    // console.log("SIGS", sigS)

    console.log(`r1 -----------> ${r1}`)
    console.log(`s1 -----------> ${s1}`)
    console.log(`v1 -----------> ${v1}`)
    console.log(`vd1 ----------> ${v_decimal1}`)

    console.log(`r2 -----------> ${r2}`)
    console.log(`s2 -----------> ${s2}`)
    console.log(`v3 -----------> ${v2}`)
    console.log(`vd3 ----------> ${v_decimal2}`)

    contract.options.gas = 5000000;
    const response = await contract.methods.recoverAddr(hex_msg, v_decimal1, r1, s1).call()
    const response2 = await contract.methods.recoverAddr(hex_msg, v_decimal2, r2, s2).call()
    //const signed = await contract.methods.isSigned(response, hex_msg, v_decimal, r, s).call()
    //const execute = await contract.methods.execute(v_decimal, r, s, hex_msg).call()
    //const create = await contract.methods.createTransaction(hex_msg).send({from: accounts[0]}).then(console.log)
    //const sign1 = await contract.methods.signTransaction(0).send({from: accounts[1]}).then(console.log)
    //const sign2 = await contract.methods.signTransaction(0).send({from: accounts[2]}).then(console.log)

    console.log('-----data------'),
    console.log(`input addr ==> ${this.state.accounts[0]}`),
    console.log(`input addr ==> ${this.state.accounts[1]}`),
    console.log(`output addr => ${response}`)
    console.log(`output addr => ${response2}`)
    //console.log(`is signed => ${signed}`)
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <h1>Ethereum Protocol in the making</h1>
        <button onClick={this.getPendingTx()}>Get pending tx</button>
      </div>
    );
  }

}

export default App
