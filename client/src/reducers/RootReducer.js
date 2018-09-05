import { Reducer } from 'kawax-js';

class RootReducer extends Reducer {
  static initialState = {
    signature: ""
  };

  signTx = (state, action) => {
    const signature = action.payload;
    return {
      signature
    };
  }

  state = this.matchSuccess({
    SIGN: this.signTx,
  });
}

export default RootReducer;
