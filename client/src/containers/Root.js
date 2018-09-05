import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'kawax-js';
import WorkingStuff from '../components/WorkingStuff';

class RootContainer extends React.Component {

  render() {
    return (
      <div>
      <WorkingStuff/>
      </div>
    );
  }

}

export default Container(RootContainer);
