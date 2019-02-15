import React, {Component} from 'react';
import { StyleProvider, getTheme } from 'native-base';
import customVariables from './variables';
import PAGE from './PAGE';

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(customVariables)}>
        <PAGE/>
      </StyleProvider>
    );
  }
}
