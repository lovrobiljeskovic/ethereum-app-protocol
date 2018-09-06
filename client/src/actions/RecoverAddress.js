import getWeb3 from '../utils/getWeb3';
import { Action } from 'kawax-js';
import getContractInstance from '../utils/getContractInstance'
import contractDefinition from '../contracts/Verifier.json'

class RecoverAddress extends Action {

  static type = "RECOVER";

  call = async ({hexData, v, r, s}) => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
     // Get the contract instance by passing in web3 and the contract definition.
    const contract = await getContractInstance(web3, contractDefinition)
    const address = await contract.methods.recoverAddr(hexData, v, r, s).call()
    const signed = await contract.methods.isSigned(address, hexData, v, r, s).call()
    console.log("Recovered address:", address);
    return {
      address,
      signed
    };
  };

}

export default RecoverAddress;
