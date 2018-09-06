import getWeb3 from '../utils/getWeb3';
import { Action } from 'kawax-js';
import getContractInstance from '../utils/getContractInstance';
import contractDefinition from '../contracts/Verifier.json';

class CreateTransaction extends Action {

  static type = "CREATE"

  call = async ({hexData, address}) => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
     // Get the contract instance by passing in web3 and the contract definition.
    const contract = await getContractInstance(web3, contractDefinition);
    contract.options.gas = 5000000;
    const createTransaction = await contract.methods.createTransaction(hexData).send({from: address}).then(function(receipt){
      return receipt.events
    });
    return {
      createTransaction
    };
  };

}

export default CreateTransaction;
