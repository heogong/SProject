import React, {Component} from 'react';
import {Scene, Router, Stack, Overlay, ActionConst} from 'react-native-router-flux';
import InitPage from './src/LOGIN/pages/InitPage';
import PageOne from './src/LOGIN/pages/PageOne';
import PageTwo from './src/LOGIN/pages/PageTwo';

const PAGE = () => ( 
  <Router>
    <Scene>
      <Scene key="InitPage" component={InitPage} title="InitPage!!" initial type={ActionConst.RESET}/>
      <Scene key="pageOne" component={PageOne} title="PageOne"/>
      <Scene key="pageTwo" component={PageTwo} title="PageTwo"/>
    </Scene>
  </Router>
);

export default PAGE;