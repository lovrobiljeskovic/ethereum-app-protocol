import getWeb3 from '../utils/getWeb3';
import { Action } from 'kawax-js';

class SignData extends Action {

  static type = "SIGN.DATA";

  call = async ({data, address}) => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    const hexData = web3.utils.sha3(data);
    const signature = await web3.eth.sign(hexData, address);
    return {
      hexData,
      signature
    };
  };

}

export default SignData;
