import React, {Component} from 'react';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';
import TabIcon from './src/Common/Components/TabIcon';
import InitPage from './src/FirstScreen/Pages/InitPage';
import PageOne from './src/FirstScreen/Pages/PageOne';

import JoinCustomerType from './src/FirstScreen/Pages/Join/CustomerType';
import JoinAccountType from './src/FirstScreen/Pages/Join/AccountType';
import JoinInputEmail from './src/FirstScreen/Pages/Join/InputEmail';
import JoinInputName from './src/FirstScreen/Pages/Join/InputName';
import JoinInputPhone from './src/FirstScreen/Pages/Join/InputPhone';
import JoinInputPhoneAuth from './src/FirstScreen/Pages/Join/InputPhoneAuth';

import LoginAccountType from './src/FirstScreen/Pages/Login/AccountType';
import LoginInputAccount from './src/FirstScreen/Pages/Login/InputAccount';

import JoinInputBizLicense from './src/FirstScreen/Pages/Join/Partner/InputBizLicense'; // 파트너 사업장 등록
import JoinSetPartnerAddress from './src/FirstScreen/Pages/Join/Partner/SetAddress'; // 파트너 주소 등록
import JoinSearchPartnerAddress from './src/FirstScreen/Pages/Join/Partner/SearchAddress'; // 파트너 주소 검색

import JoinInputProdType from './src/FirstScreen/Pages/Join/Partner/InputProdType'; // 파트너 제품타입 선택
import JoinInputWorkHours from './src/FirstScreen/Pages/Join/Partner/InputWorkHours'; // 파트너 근무시간 선택

import CardIndex from './src/Card/Pages';
import CardInputInfo from './src/Card/Pages/InputCardInfo';
import CardListInfo from './src/Card/Pages/ListCardInfo';

import Main from './src/Main/Pages';

import DrawerContent from './src/Main/Components/DrawerContent'
import MenuIcon from './src/Main/Images/menu_burger.png'


//test
import TestPage1 from './src/Main/Pages/TestPage1'
import TestPage2 from './src/Main/Pages/TestPage2'
import TestPage3 from './src/Main/Pages/TestPage3'
//test

import ReactCamera from './src/Main/Components/ReactCamera';
import ViewImage from './src/Main/Components/ViewImage';

/**사업장 */
import BusinessIndex from './src/Main/Pages/Business'
// 사업장 목록
import ListBusinessPlace from './src/Main/Pages/Business/ListBusinessPlace'
// 사업장 등록
import RegBusinessPlace from './src/Main/Pages/Business/RegBusinessPlace'
// 사업장 주소등록
import SetAddress from './src/Main/Pages/Business/Address/SetAddress'
import SearchAddress from './src/Main/Pages/Business/Address/SearchAddress'

/**제품 */
import InputProdType from './src/Main/Pages/Business/Product/InputProdType' // 제품 타입등록
import InputProdInfo from './src/Main/Pages/Business/Product/InputProdInfo' // 제품 등록
import InputProdImage from './src/Main/Pages/Business/Product/InputProdImage' // 제품 이미지 등록


const PAGE = () => ( 
  
  <Router>
    <Stack transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
      <Scene key="InitPage" initial hideNavBar component={InitPage} title="InitPage" type={ActionConst.RESET} />
      <Scene key="pageOne" component={PageOne} title="PageOne!!!" back onBack={() => Actions.InitPage()}/>

      <Scene key="reactCamera" hideNavBar component={ReactCamera} />
      <Scene key="ViewImage" hideNavBar component={ViewImage} title="제품 이미지 조회" />
      
      <Scene key="JoinCustomerType" hideNavBar component={JoinCustomerType} title="고객 구분" />
      <Scene key="JoinAccountType" hideNavBar component={JoinAccountType} title="가입 구분"/>
      <Scene key="JoinInputEmail" hideNavBar component={JoinInputEmail} title="이메일 가입" back onBack={() => Actions.JoinInputName()} />
      <Scene key="JoinInputName" hideNavBar component={JoinInputName} title="고객 이름"/>
      <Scene key="JoinInputPhone" hideNavBar component={JoinInputPhone} title="전화번호"/>
      <Scene key="JoinInputPhoneAuth" hideNavBar component={JoinInputPhoneAuth} title="본인 인증"/>
      
      {/* 파트너 회원가입 */}
      <Scene key="JoinInputBizLicense" hideNavBar component={JoinInputBizLicense} title="사업장 등록" type={ActionConst.RESET}/>
      <Scene key="JoinSetPartnerAddress" hideNavBar component={JoinSetPartnerAddress} title="" />
      <Scene key="JoinSearchPartnerAddress" hideNavBar component={JoinSearchPartnerAddress} title="" />
      
      <Scene key="JoinInputProdType"  hideNavBar component={JoinInputProdType} title="파트너 회원가입 제품 선택" />
      <Scene key="JoinInputWorkHours" hideNavBar component={JoinInputWorkHours} title="근무시간" type={ActionConst.RESET}/>
      
      <Scene key="LoginAccountType" hideNavBar component={LoginAccountType} title="로그인 구분" back onBack={() => Actions.InitPage()}/>
      <Scene key="LoginInputAccount" hideNavBar component={LoginInputAccount} title="이메일 로그인"/>

      <Scene key="CardIndex" hideNavBar component={CardIndex} title="카드 등록 페이지" type={ActionConst.RESET}/>
      <Scene key="CardInputInfo" hideNavBar component={CardInputInfo} title="카드 등록" />
      <Scene key="CardListInfo" hideNavBar component={CardListInfo} title="" />

      {/* 클라이언트 */}
      <Scene key="BusinessIndex" hideNavBar component={BusinessIndex} type={ActionConst.RESET} />
      <Scene key="ListBusinessPlace" component={ListBusinessPlace} title="사업장 목록" type={ActionConst.RESET} onRight={() => Actions.RegBusinessPlace()} rightTitle="추가" />
      <Scene key="RegBusinessPlace"  hideNavBar component={RegBusinessPlace} title="사업장 등록"/>
      <Scene key="SetAddress" hideNavBar component={SetAddress} title="주소" />
      <Scene key="SearchAddress" hideNavBar component={SearchAddress} title="주소 등록"/>
      
      <Scene key="InputProdType" hideNavBar component={InputProdType} type={ActionConst.RESET} />
      <Scene key="InputProdInfo" hideNavBar component={InputProdInfo} title="제품 등록" onRight={()=>{}} rightTitle={'Save'}/>
      <Scene key="InputProdImage" hideNavBar component={InputProdImage} type={ActionConst.RESET} />


      <Drawer
        hideNavBar
        key="drawer"
        onExit={() =>{
          console.log('Drawer closed');
        }}
        onEnter={() => {
          console.log('Drawer opened');
        }}
        contentComponent={DrawerContent}
        drawerImage={MenuIcon}
        drawerWidth={300}
      >
        <Scene hideNavBar panHandlers={null}>
          <Tabs
            key="tabbar"
            routeName="tabbar"
            backToInitial
            onTabOnPress={() => {
              console.log('Back to initial and also print this');
            }}
            swipeEnabled
            showLabel={true}
            activeBackgroundColor="white"
            inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
            tabBarPosition="bottom"
          >
            <Stack key="MainStack" hideNavBar title="Stack_Title" initial icon={TabIcon}>
              <Scene key="Main" component={Main} title="Scene_Title"/>
            </Stack>
            <Stack key="tab_2" title="Tab #2" icon={TabIcon}>
              <Scene key="tab_2_1" component={TestPage2} title="Tab #2_2"/>
            </Stack>
            <Stack key="tab_3" title="Tab #3" icon={TabIcon}>
              <Scene key="tab_3_1" component={TestPage3} title="Tab #2_3"/>
            </Stack>
          </Tabs>
        </Scene>
      </Drawer>
     
      {/* <Drawer
        hideNavBar
        key="drawer"
        onExit={() =>{
          console.log('Drawer closed');
        }}
        onEnter={() => {
          console.log('Drawer opened');
        }}
        contentComponent={DrawerContent}
        drawerImage={MenuIcon}
        drawerWidth={300}
      >
        <Scene key="root" hideNavBar transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
          <Stack key="MainStack" hideNavBar>
            <Scene key="Main" component={Main} />
          </Stack>

          <Stack key="MainStack1" transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
            <Scene key="InputProdType" hideNavBar component={InputProdType}/>
            <Scene key="InputProdInfo" hideNavBar component={InputProdInfo} title="제품 등록" onRight={()=>{}} rightTitle={'Save'}/>
            <Scene key="InputProdImage" component={InputProdImage} title="제품 이미지 등록" />
          </Stack>
          
          <Stack key="MainStack2">
            <Scene key="test2" component={TestPage2} title="Tab #2_1"/>
          </Stack>

        </Scene>
      </Drawer> */}
    </Stack>
  </Router>
);


{/* 일단 남겨두기
  <Scene hideNavBar panHandlers={null}>
    <Tabs
      key="tabbar"
      routeName="tabbar"
      legacy
      backToInitial
      onTabOnPress={() => {
        console.log('Back to initial and also print this');
      }}
      swipeEnabled
      showLabel={false}
      tabBarStyle={styles.tabBarStyle}
      activeBackgroundColor="white"
      inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
    >
      <Stack
        key="tab_1"
        title="Tab #1"
        tabBarLabel="TAB #1"
        inactiveBackgroundColor="#FFF"
        activeBackgroundColor="#DDD"
        icon={TabIcon}
        navigationBarStyle={{ backgroundColor: 'green' }}
        titleStyle={{ color: 'white', alignSelf: 'center' }}
      >
        <Scene key="tab_1_1" component={TabView} title="Tab #1_1" onRight={() => alert('Right button')} rightTitle="Right" />

        <Scene key="tab_1_2" component={TabView} title="Tab #1_2" back titleStyle={{ color: 'black', alignSelf: 'center' }} />
      </Stack>

      <Stack key="tab_2" title="Tab #2" icon={TabIcon} initial>
        <Scene key="tab_2_1" component={TabView} title="Tab #2_1" renderRightButton={() => <Text>Right</Text>} />
        <Scene key="tab_2_2" component={TabView} title="Tab #2_2" back onBack={() => alert('onBack button!')} hideDrawerButton backTitle="Back!" panHandlers={null} />
      </Stack>

      <Stack key="tab_3" icon={TabIcon} title="Tab #3">
        <Scene key="tab_3_1" component={TabView} rightTitle="Reset to 'tabbar'" onRight={() => Actions.reset('tabbar')} />
      </Stack>
      <Scene key="tab_4_1" component={TabView} title="Tab #4" hideNavBar icon={TabIcon} />
      <Stack key="tab_5" icon={TabIcon} title="Tab #5">
        <Scene key="tab_5_1" component={TabView} />
      </Stack>
    </Tabs>
</Scene> */}

export default PAGE;

