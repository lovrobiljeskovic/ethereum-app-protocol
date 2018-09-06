import getWeb3 from '../utils/getWeb3'
import { Action } from 'kawax-js';
import getContractInstance from '../utils/getContractInstance';
import contractDefinition from '../contracts/Verifier.json';

class SignTransaction extends Action {

  static type = "SIGN";

  call = async({transactionId, address}) => {
    const web3 = await getWeb3();
    const contract = await getContractInstance(web3, contractDefinition);
    contract.options.gas = 5000000;
    const signTransaction = await contract.methods.signTransaction(transactionId).send({from: address}).then(function(receipt){
      return receipt;
    });
    return {
      signTransaction
    };
  };

}

export default SignTransaction
