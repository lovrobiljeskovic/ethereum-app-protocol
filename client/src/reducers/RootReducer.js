import { Reducer } from 'kawax-js';

class RootReducer extends Reducer {

  static initialState = {
    address: "",
    signed: false,
    hexData: "",
    signature: "",
  }

  signTransaction = (state, action) => {
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

  createTransaction = (state, action) => {
    const {createTransaction} = action.payload;
    return {
      createTransaction
    };
  }

  state = this.matchSuccess({
    SIGN: this.signTransaction,
    RECOVER: this.recoverAddress,
    CREATE: this.createTransaction
  });
}

export default RootReducer;
