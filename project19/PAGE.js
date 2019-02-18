import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';

import ClientMain from './ClientMain';
import SelectProduct from './SelectProduct';
import SelectProduct2 from './SelectProduct2';
import ApplyAfterService from './ApplyAfterService';
import HistoryAfterService from './HistoryAfterService';
import AfterServiceState from './AfterServiceState';
import AfterServiceState2 from './AfterServiceState2';
import HistoryAfterServiceChk from './HistoryAfterServiceChk';
import HistoryAfterServiceChk2 from './HistoryAfterServiceChk2';
import ReportAfterService from './ReportAfterService';
import SelectUserType from './SelectUserType';


import pageOne from './Page1'
import pageTwo from './Page2'
import pageThree from './Page3'

const PAGE = () => (
    <Router>
        <Stack key="root">
            <Scene key="ClientMain" hideNavBar component={ClientMain} type={ActionConst.RESET}/>
            <Scene key="SelectProduct" hideNavBar component={SelectProduct} type={ActionConst.RESET}/>
            <Scene key="SelectProduct2" hideNavBar component={SelectProduct2} type={ActionConst.RESET}/>
            <Scene key="ApplyAfterService" hideNavBar component={ApplyAfterService} type={ActionConst.RESET}/>
            <Scene key="HistoryAfterService" hideNavBar component={HistoryAfterService} type={ActionConst.RESET}/>
            <Scene key="AfterServiceState" hideNavBar component={AfterServiceState} type={ActionConst.RESET}/>
            <Scene key="AfterServiceState2" hideNavBar component={AfterServiceState2} type={ActionConst.RESET}/>
            <Scene key="HistoryAfterServiceChk" hideNavBar component={HistoryAfterServiceChk} type={ActionConst.RESET}/>
            <Scene key="HistoryAfterServiceChk2" hideNavBar component={HistoryAfterServiceChk2} type={ActionConst.RESET}/>
            <Scene key="ReportAfterService" hideNavBar component={ReportAfterService} type={ActionConst.RESET}/>
            <Scene key="SelectUserType" hideNavBar component={SelectUserType} initial type={ActionConst.RESET}/>
            


            <Scene key="pageOne" hideNavBar component={pageOne} title="pageOne" type={ActionConst.RESET}/>
            <Scene key="pageTwo" component={pageTwo} title="pageTwo"/>
            <Scene key="pageThree" component={pageThree}/>
        </Stack>
    </Router>
);
export default PAGE;
