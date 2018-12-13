import React, {Component} from 'react';
import Page from './Page';

import reducer from './src/Redux/Reducers';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Page/>
      </Provider>
    );
  }
}
