import 'babel-polyfill';
import Kawax from 'kawax-js';
import RootContainer from './containers/Root';

window.onload = () => {
  Kawax.new({
    htmlRoot: 'root',
    container: RootContainer,
    // eslint-disable-next-line no-underscore-dangle
    csrfToken: window.__CSRF_TOKEN__,
  });
};
