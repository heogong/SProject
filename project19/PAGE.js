import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';

import pageOne from './Page1'
import pageTwo from './Page2'
import pageThree from './Page3'

const PAGE = () => (
    <Router>
        <Stack key="root">
            <Scene key="pageOne" hideNavBar component={pageOne} title="pageOne" initial type={ActionConst.RESET}/>
            <Scene key="pageTwo" component={pageTwo} title="pageTwo"/>
            <Scene key="pageThree" component={pageThree}/>
        </Stack>
    </Router>
);
export default PAGE;