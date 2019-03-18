import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import TabIcon from './TabIcon';

import Intro from './Intro';
import ClientMain from './ClientMain';
import SelectProduct from './SelectProduct';
import SelectProduct2 from './SelectProduct2';
import ApplyAfterService from './ApplyAfterService';
import HistoryAfterService from './HistoryAfterService';
import AfterServiceState from './AfterServiceState';
import HistoryAfterServiceChk from './HistoryAfterServiceChk';
import HistoryAfterServiceChk2 from './HistoryAfterServiceChk2';
import ReportAfterService from './ReportAfterService';
import SelectUserType from './SelectUserType';
import UserLogin from './UserLogin';
import InvaildId from './InvaildId';
import SelectJoinType from './SelectJoinType';
import JoinEmail from './JoinEmail';
import JoinName from './JoinName';
import JoinPhone from './JoinPhone';
import JoinPhoneAuth from './JoinPhoneAuth';
import JoinSuccess from './JoinSuccess';
import RegCard from './RegCard';
import ManageCard from './ManageCard';
import RegSuccessCard from './RegSuccessCard';
import AgreeTermsService from './AgreeTermsService';
import RegSuccessTerm from './RegSuccessTerm';
import RegBusinessPlace from './RegBusinessPlace';
import RegBusinessName from './RegBusinessName';
import RegBusinessAddress from './RegBusinessAddress';
import RegBusinessAddressDetail from './RegBusinessAddressDetail';
import FindBusinessAddress from './FindBusinessAddress';
import SuccessBusinessPlace from './SuccessBusinessPlace';
import RegProduct from './RegProduct';
import RegProductInfo from './RegProductInfo';
import SuccessRegProduct from './SuccessRegProduct';
import RegProductDetail from './RegProductDetail';
import TakeProductImage from './TakeProductImage';;
import TakeProductGuide2 from './TakeProductGuide2';
import BusinessRegistration1 from './BusinessRegistration1';
import BusinessRegistration2 from './BusinessRegistration2';
import BusinessRegistration3 from './BusinessRegistration3';
import SelectSpecialty from './SelectSpecialty';
import SelectWorkTime from './SelectWorkTime';
import RegPassBook1 from './RegPassBook1';
import RegPassBook2 from './RegPassBook2';
import RegPassBook3 from './RegPassBook3';
import PartnerMain from './PartnerMain';
import ListApplyAfterService from './ListApplyAfterService';
import ListApplyAfterServiceEmpty from './ListApplyAfterServiceEmpty';
import DetailApplyAfterService from './DetailApplyAfterService';
import RegAddAs from './RegAddAs';
import ListNotCompReport from './ListNotCompReport';
import ListNotCompReportEmpty from './ListNotCompReportEmpty';
import RegReportStep1 from './RegReportStep1';
import MoreMenu from './MoreMenu';
import MyProfileInfo from './MyProfileInfo';
import MyProfileModPassword1 from './MyProfileModPassword1';
import MyProfileModPassword2 from './MyProfileModPassword2';
import MyProfileModPhone from './MyProfileModPhone';
import MyProfileModName from './MyProfileModName';
import MyProfileExit1 from './MyProfileExit1';
import MyProfileExit2 from './MyProfileExit2';
import MyProfileCompany from './MyProfileCompany';
import MyCalcuList from './MyCalcuList';
import NoticeList from './NoticeList';
import TermsMenu from './TermsMenu'
import TermsContent1 from './TermsContent1';
import ListBusinessPlace from './ListBusinessPlace';
import RegProductType from './RegProductType';
import ClientIntroGuide from './ClientIntroGuide';
import MatchingWait from './MatchingWait'
import PartnerIntroGuide from './PartnerIntroGuide';
import PartnerGuide1 from './PartnerGuide1';
import PartnerGuide2 from './PartnerGuide2';
import PartnerGuide1_1 from './PartnerGuide1_1';
import PartnerGuide1_2 from './PartnerGuide1_2';
import PartnerGuide2_1 from './PartnerGuide2_1';
import PartnerGuide2_2 from './PartnerGuide2_2';

import pageOne from './Page1'
import pageTwo from './Page2'
import pageThree from './Page3'

const PAGE = () => (
    <Router>
        <Stack key="root">
            <Scene key="Intro" hideNavBar component={Intro} type={ActionConst.RESET}/>
            <Scene key="SelectUserType" hideNavBar component={SelectUserType} type={ActionConst.RESET}/>
            <Scene key="ClientIntroGuide" hideNavBar component={ClientIntroGuide} type={ActionConst.RESET}/>
            <Scene key="UserLogin" hideNavBar component={UserLogin} type={ActionConst.RESET}/>
            <Scene key="InvaildId" hideNavBar component={InvaildId} type={ActionConst.RESET}/>
            <Scene key="SelectJoinType" hideNavBar component={SelectJoinType} type={ActionConst.RESET}/>
            <Scene key="JoinEmail"  hideNavBar component={JoinEmail} type={ActionConst.RESET}/>
            <Scene key="JoinName" hideNavBar component={JoinName} type={ActionConst.RESET}/>
            <Scene key="JoinPhone" hideNavBar component={JoinPhone} type={ActionConst.RESET}/>
            <Scene key="JoinPhoneAuth" hideNavBar component={JoinPhoneAuth} type={ActionConst.RESET}/>
            <Scene key="JoinSuccess" hideNavBar component={JoinSuccess} type={ActionConst.RESET}/>
            
            <Scene key="RegCard" hideNavBar component={RegCard}  type={ActionConst.RESET}/>
            <Scene key="ManageCard" hideNavBar component={ManageCard} type={ActionConst.RESET}/>
            <Scene key="RegSuccessCard" hideNavBar component={RegSuccessCard} type={ActionConst.RESET}/>
            <Scene key="AgreeTermsService" hideNavBar component={AgreeTermsService} type={ActionConst.RESET}/>
            <Scene key="RegSuccessTerm" hideNavBar component={RegSuccessTerm}  type={ActionConst.RESET}/>
            <Scene key="RegBusinessPlace" hideNavBar component={RegBusinessPlace} type={ActionConst.RESET}/>
            <Scene key="RegBusinessName" hideNavBar component={RegBusinessName} type={ActionConst.RESET}/>
            <Scene key="RegBusinessAddress" hideNavBar component={RegBusinessAddress} type={ActionConst.RESET}/>
            <Scene key="FindBusinessAddress" hideNavBar component={FindBusinessAddress} type={ActionConst.RESET}/>            
            <Scene key="RegBusinessAddressDetail" hideNavBar component={RegBusinessAddressDetail} type={ActionConst.RESET}/>
            <Scene key="SuccessBusinessPlace" hideNavBar component={SuccessBusinessPlace} type={ActionConst.RESET}/>
            <Scene key="RegProductInfo" hideNavBar component={RegProductInfo} type={ActionConst.RESET}/>
            <Scene key="RegProductDetail" hideNavBar component={RegProductDetail}  type={ActionConst.RESET}/>
            <Scene key="TakeProductImage" hideNavBar component={TakeProductImage}  type={ActionConst.RESET}/>
            <Scene key="TakeProductGuide2" hideNavBar component={TakeProductGuide2} type={ActionConst.RESET}/>
            <Scene key="SuccessRegProduct" hideNavBar component={SuccessRegProduct} type={ActionConst.RESET}/>
            {/* <Scene key="ClientMain" hideNavBar component={ClientMain} type={ActionConst.RESET}/> */}
            <Scene hideNavBar panHandlers={null}>
            {/* Client Main */}
                <Tabs
                    key="clientMain"
                    routeName="clientMain"
                    onTabOnPress={() => {
                        console.log('Back to initial and also print this');
                    }}
                    swipeEnabled
                    showLabel={false}
                    activeBackgroundColor="#fff"
                    inactiveBackgroundColor="#fff"
                    tabBarPosition="bottom"
                    tabStyle={{height: 56, borderTopWidth: 1, borderColor: "#ddd"}}
                    >
                    <Stack key="tab1" hideNavBar iconImg={require("./img/user_footer_icon/tab1.png")} icon={TabIcon}
                        tabBarOnPress={() => Actions.ClientMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="ClientMain" component={ClientMain}/>
                    </Stack>

                    <Stack key="tab2" hideNavBar iconImg={require("./img/user_footer_icon/tab2.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.ClientMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="ClientMain" component={ClientMain}/>
                    </Stack>

                    <Stack key="tab3" hideNavBar iconImg={require("./img/user_footer_icon/tab3.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.ClientMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="ClientMain" component={ClientMain}/>
                    </Stack>

                    <Stack key="tab4" hideNavBar iconImg={require("./img/user_footer_icon/tab4.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.ClientMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="ClientMain" component={ClientMain}/>
                    </Stack>
                </Tabs>
            </Scene>
            <Scene key="SelectProduct" hideNavBar component={SelectProduct}  type={ActionConst.RESET}/>
            <Scene key="SelectProduct2" hideNavBar component={SelectProduct2} type={ActionConst.RESET}/>
            <Scene initial key="ApplyAfterService" hideNavBar component={ApplyAfterService} type={ActionConst.RESET}/>
            <Scene key="MatchingWait" hideNavBar component={MatchingWait} type={ActionConst.RESET}/>
            {/* <Scene key="AfterServiceState" hideNavBar component={AfterServiceState} type={ActionConst.RESET}/> */}
            <Scene hideNavBar panHandlers={null}>
            {/* Client Main */}
                <Tabs
                    key="AfterServiceState"
                    routeName="AfterServiceState"
                    onTabOnPress={() => {
                        console.log('Back to initial and also print this');
                    }}
                    swipeEnabled
                    showLabel={false}
                    activeBackgroundColor="#fff"
                    inactiveBackgroundColor="#fff"
                    tabBarPosition="bottom"
                    tabStyle={{height: 56, borderTopWidth: 1, borderColor: "#ddd"}}
                    >
                    <Stack key="tab1" hideNavBar iconImg={require("./img/user_footer_icon/tab1.png")} icon={TabIcon}
                        tabBarOnPress={() => Actions.AfterServiceState({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="AfterServiceState" component={AfterServiceState}/>
                    </Stack>

                    <Stack key="tab2" hideNavBar iconImg={require("./img/user_footer_icon/tab2.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.AfterServiceState({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="AfterServiceState" component={AfterServiceState}/>
                    </Stack>

                    <Stack key="tab3" hideNavBar iconImg={require("./img/user_footer_icon/tab3.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.ClientMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="AfterServiceState" component={AfterServiceState}/>
                    </Stack>

                    <Stack key="tab4" hideNavBar iconImg={require("./img/user_footer_icon/tab4.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.ClientMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="AfterServiceState" component={AfterServiceState}/>
                    </Stack>
                </Tabs>
            </Scene>
            <Scene key="HistoryAfterServiceChk2" hideNavBar component={HistoryAfterServiceChk2} type={ActionConst.RESET}/>
            <Scene key="HistoryAfterServiceChk" hideNavBar component={HistoryAfterServiceChk} type={ActionConst.RESET}/>
            <Scene key="ReportAfterService" hideNavBar component={ReportAfterService} type={ActionConst.RESET}/>
            <Scene key="ListBusinessPlace" hideNavBar component={ListBusinessPlace} type={ActionConst.RESET}/>
            <Scene key="RegProductType" hideNavBar component={RegProductType} type={ActionConst.RESET}/>
            <Scene key="RegProduct" hideNavBar component={RegProduct} type={ActionConst.RESET}/>


            {/* <Scene key="MoreMenu" hideNavBar component={MoreMenu}  type={ActionConst.RESET}/> */}
            <Scene hideNavBar panHandlers={null}>
            {/* Client Main */}
                <Tabs
                    key="MoreMenu"
                    routeName="MoreMenu"
                    onTabOnPress={() => {
                        console.log('Back to initial and also print this');
                    }}
                    swipeEnabled
                    showLabel={false}
                    activeBackgroundColor="#fff"
                    inactiveBackgroundColor="#fff"
                    tabBarPosition="bottom"
                    tabStyle={{height: 56, borderTopWidth: 1, borderColor: "#ddd"}}
                    >
                    <Stack key="tab1" hideNavBar iconImg={require("./img/user_footer_icon/tab1.png")} icon={TabIcon}
                        tabBarOnPress={() => Actions.MoreMenu({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="MoreMenu" component={MoreMenu}/>
                    </Stack>

                    <Stack key="tab2" hideNavBar iconImg={require("./img/user_footer_icon/tab2.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.MoreMenu({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="MoreMenu" component={MoreMenu}/>
                    </Stack>

                    <Stack key="tab3" hideNavBar iconImg={require("./img/user_footer_icon/tab3.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.MoreMenu({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="MoreMenu" component={MoreMenu}/>
                    </Stack>

                    <Stack key="tab4" hideNavBar iconImg={require("./img/user_footer_icon/tab4.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.MoreMenu({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="MoreMenu" component={MoreMenu}/>
                    </Stack>
                </Tabs>
            </Scene>
            <Scene key="MyProfileInfo" hideNavBar component={MyProfileInfo}  type={ActionConst.RESET}/>
            <Scene key="MyProfileModPassword1" hideNavBar component={MyProfileModPassword1}  type={ActionConst.RESET}/>
            <Scene key="MyProfileModPassword2" hideNavBar component={MyProfileModPassword2}  type={ActionConst.RESET}/>
            <Scene key="MyProfileModPhone" hideNavBar component={MyProfileModPhone}  type={ActionConst.RESET}/>
            <Scene key="MyProfileModName" hideNavBar component={MyProfileModName}  type={ActionConst.RESET}/>
            <Scene key="MyProfileExit1" hideNavBar component={MyProfileExit1}  type={ActionConst.RESET}/>
            <Scene key="MyProfileExit2" hideNavBar component={MyProfileExit2}  type={ActionConst.RESET}/>
            <Scene key="NoticeList" hideNavBar component={NoticeList}  type={ActionConst.RESET}/>
            <Scene key="TermsMenu" hideNavBar component={TermsMenu}  type={ActionConst.RESET}/>
            <Scene key="TermsContent1" hideNavBar component={TermsContent1}  type={ActionConst.RESET}/>


            <Scene key="PartnerIntroGuide" hideNavBar component={PartnerIntroGuide} type={ActionConst.RESET}/>
            <Scene key="BusinessRegistration1" hideNavBar component={BusinessRegistration1} type={ActionConst.RESET}/>
            <Scene key="BusinessRegistration2" hideNavBar component={BusinessRegistration2}  type={ActionConst.RESET}/>
            <Scene key="BusinessRegistration3" hideNavBar component={BusinessRegistration3} type={ActionConst.RESET}/>
            <Scene key="SelectSpecialty" hideNavBar component={SelectSpecialty} type={ActionConst.RESET}/>
            <Scene key="SelectWorkTime" hideNavBar component={SelectWorkTime} type={ActionConst.RESET}/>
            <Scene key="RegPassBook1" hideNavBar component={RegPassBook1} type={ActionConst.RESET}/>
            <Scene key="RegPassBook2" hideNavBar component={RegPassBook2} type={ActionConst.RESET}/>
            <Scene key="RegPassBook3" hideNavBar component={RegPassBook3} type={ActionConst.RESET}/>
            {/* <Scene key="PartnerMain" hideNavBar component={PartnerMain} type={ActionConst.RESET}/> */}
            <Scene hideNavBar panHandlers={null}>
            {/* Partner Main */}
                <Tabs
                    key="PartnerMain"
                    routeName="PartnerMain"
                    onTabOnPress={() => {
                        console.log('Back to initial and also print this');
                    }}
                    swipeEnabled
                    showLabel={false}
                    activeBackgroundColor="#fff"
                    inactiveBackgroundColor="#fff"
                    tabBarPosition="bottom"
                    tabStyle={{height: 56, borderTopWidth: 1, borderColor: "#ddd"}}
                    >
                    <Stack key="tab1" hideNavBar iconImg={require("./img/partner_footer_icon/tab1.png")} icon={TabIcon}
                        tabBarOnPress={() => Actions.PartnerMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="PartnerMain" component={PartnerMain}/>
                    </Stack>

                    <Stack key="tab2" hideNavBar iconImg={require("./img/partner_footer_icon/tab2.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.PartnerMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="PartnerMain" component={PartnerMain}/>
                    </Stack>

                    <Stack key="tab3" hideNavBar iconImg={require("./img/partner_footer_icon/tab3.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.PartnerMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="PartnerMain" component={PartnerMain}/>
                    </Stack>

                    <Stack key="tab4" hideNavBar iconImg={require("./img/partner_footer_icon/tab4.png")} icon={TabIcon} 
                        tabBarOnPress={() => Actions.PartnerMain({type:ActionConst.RESET})}
                        transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                        <Scene key="PartnerMain" component={PartnerMain}/>
                    </Stack>
                </Tabs>
            </Scene>
            <Scene key="PartnerGuide1" hideNavBar component={PartnerGuide1} type={ActionConst.RESET}/>
            <Scene key="PartnerGuide2" hideNavBar component={PartnerGuide2} type={ActionConst.RESET}/>
            <Scene key="PartnerGuide1_1" hideNavBar component={PartnerGuide1_1} type={ActionConst.RESET}/>
            <Scene key="PartnerGuide1_2" hideNavBar component={PartnerGuide1_2} type={ActionConst.RESET}/>
            <Scene key="PartnerGuide2_1" hideNavBar component={PartnerGuide2_1} type={ActionConst.RESET}/>
            <Scene key="PartnerGuide2_2" hideNavBar component={PartnerGuide2_2} type={ActionConst.RESET}/>
            <Scene key="ListApplyAfterService" hideNavBar component={ListApplyAfterService} type={ActionConst.RESET}/>
            <Scene key="ListApplyAfterServiceEmpty" hideNavBar component={ListApplyAfterServiceEmpty} type={ActionConst.RESET}/>
            <Scene key="DetailApplyAfterService" hideNavBar component={DetailApplyAfterService}  type={ActionConst.RESET}/>
            <Scene key="RegReportStep1" hideNavBar component={RegReportStep1}  type={ActionConst.RESET}/>
            <Scene key="RegAddAs" hideNavBar component={RegAddAs}  type={ActionConst.RESET}/>
            <Scene key="ListNotCompReport" hideNavBar component={ListNotCompReport}  type={ActionConst.RESET}/>
            <Scene key="ListNotCompReportEmpty" hideNavBar component={ListNotCompReportEmpty}  type={ActionConst.RESET}/>
            <Scene key="MyProfileCompany" hideNavBar component={MyProfileCompany}  type={ActionConst.RESET}/>
            <Scene key="MyCalcuList" hideNavBar component={MyCalcuList}  type={ActionConst.RESET}/>
            <Scene key="HistoryAfterService" hideNavBar component={HistoryAfterService} type={ActionConst.RESET}/>



            



            <Scene key="pageOne" hideNavBar component={pageOne} title="pageOne" type={ActionConst.RESET}/>
            <Scene key="pageTwo" component={pageTwo} title="pageTwo"/>
            <Scene key="pageThree" component={pageThree}/>
            

        </Stack>
    </Router>
);
export default PAGE;
