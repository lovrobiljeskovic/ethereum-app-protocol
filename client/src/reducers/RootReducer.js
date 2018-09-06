import { Reducer } from 'kawax-js';

class RootReducer extends Reducer {

  static initialState = {
    address: "",
    signed: false,
    hexData: "",
    signature: ""
  }

  signTx = (state, action) => {
    const {...transaction} = action.payload;
    return {
      hexData: transaction.hexData,
      signature: transaction.signature
    };
  }

  recoverAddress = (state, action) => {
    const {...transaction} = action.payload;
    return {
      address: transaction.address,
      signed: transaction.signed
    };
  }

  state = this.matchSuccess({
    SIGN: this.signTx,
    RECOVER: this.recoverAddress
  });
}

export default RootReducer;
