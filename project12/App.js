import React, {Component} from 'react';
import { StyleProvider, getTheme } from 'native-base';
//import AppNavigator from './AppNavigator';
import AppNavigator from './Page';

import reducer from './src/Redux/Reducers';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import customVariables from './src/Common/Styles/NativeBase/variables';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(customVariables)}>
          <AppNavigator/>
        </StyleProvider>
      </Provider>
    );
  }
}
