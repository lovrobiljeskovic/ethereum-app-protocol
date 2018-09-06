import React from 'react';
import { Container } from 'kawax-js';
import EthProtocol from '../containers/EthProtocol';

class RootContainer extends React.Component {

  render() {
    return (
      <div>
      <EthProtocol/>
      </div>
    );
  }

}

export default Container(RootContainer);
