
import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';

import mainPage from './mainPage';
import cameraPage from './cameraPage';


const PAGE = () => ( 
  <Router>
    <Stack key="root">
      <Scene key="mainPage" component={mainPage} title="메인" init type={ActionConst.RESET}/>
      <Scene key="cameraPage" component={cameraPage} title="Register" rleftTitle={'CANCLE'}/>
    </Stack>
  </Router>
);

export default PAGE;