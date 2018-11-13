import React, {Component} from 'react';
import PAGE from './PAGE';

import reducer from './src/REDUX/reducers';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PAGE/>
      </Provider>
    );
  }
}
