import React from 'react-native';
import Navigator from 'react-native-navigator';
const {
	Router,
	Route
} = Navigator;

import IndexPage from './pages/IndexPage';
import NavigationBarSample from './pages/NavigationBarSample';
import NavSimpleExample from './pages/NavSimpleExample';

// Support params and query
class App extends React.Component{
  render() {
    return (
      <Router component={IndexPage} >
      	<Route path="/example/navbar-sample" component={NavigationBarSample} />
      	<Route path="/example/jumping-nav-sample" component={NavSimpleExample} />
      </Router>
    );
  }
};

export default App;