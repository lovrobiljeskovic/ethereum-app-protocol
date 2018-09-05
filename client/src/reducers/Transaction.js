import { Reducer } from 'kawax-js';

class Transaction extends Reducer {

  static initialState = {
    signature: false,
  };

  setSignature = (state, action) => action.payload;

  state = this.matchSuccess({
    SIGN: this.setSignature,
  });

}

export default Transaction;
