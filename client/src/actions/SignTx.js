import getWeb3 from '../utils/getWeb3';
import { Action } from 'kawax-js';

class SignTx extends Action {

  static type = "SIGN";

  pendingPayload = (tx) =>
    ({ data: tx.data, address: tx.address });

  call = async ({data, address}) => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    const hex_data = web3.utils.sha3(data);
    const signature = await web3.eth.sign(hex_data, address);
    console.log(`data ---------> ${data}`)
    console.log(`hex(data) ----> ${hex_data}`)
    console.log(`sig ---------> ${signature}`)
    return {
      signature
    };
  };

}

export default SignTx;
