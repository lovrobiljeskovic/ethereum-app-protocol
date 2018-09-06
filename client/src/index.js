import 'babel-polyfill';
import Kawax from 'kawax-js';
import RootContainer from './containers/Root';
import RootReducer from './reducers/RootReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = () => {
  Kawax.new({
    htmlRoot: 'root',
    container: RootContainer,
    reducer: RootReducer.export(),
    // eslint-disable-next-line no-underscore-dangle
    csrfToken: window.__CSRF_TOKEN__,
  });
};
