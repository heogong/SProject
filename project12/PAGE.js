import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';
import InitPage from './src/FirstScreen/pages/InitPage';
import PageOne from './src/FirstScreen/pages/PageOne';

import JoinCustomerType from './src/FirstScreen/pages/JOIN/CustomerType';
import JoinAccountType from './src/FirstScreen/pages/JOIN/AccountType';
import JoinInputEmail from './src/FirstScreen/pages/JOIN/InputEmail';
import JoinInputName from './src/FirstScreen/pages/JOIN/InputName';
import JoinInputPhone from './src/FirstScreen/pages/JOIN/InputPhone';
import JoinInputPhoneAuth from './src/FirstScreen/pages/JOIN/InputPhoneAuth';

import LoginAccountType from './src/FirstScreen/pages/Login/AccountType';
import LoginInputAccount from './src/FirstScreen/pages/Login/InputAccount';

import CardIndex from './src/CARD/pages';
import CardInputInfo from './src/CARD/pages/InputCardInfo';

import DrawerContent from './src/Main/components/DrawerContent'
import MenuIcon from './src/Main/images/menu_burger.png'
//test
import TestPage1 from './src/Main/pages/TestPage1'
import TestPage2 from './src/Main/pages/TestPage2'
import TestPage3 from './src/Main/pages/TestPage3'
//test

// 사업장 등록
import RegBusinessPlace from './src/Main/pages/Business/RegBusinessPlace'
// 사업장 주소등록
import SetAddress from './src/Main/pages/Business/Address/SetAddress'
import InputAddress from './src/Main/pages/Business/Address/InputAddress'
import SelectMapAddress from './src/Main/pages/Business/Address/SelectMapAddress'


const PAGE = () => ( 
  <Router>
    <Scene>
      {/* <Scene key="InitPage" component={InitPage} title="InitPage" initial type={ActionConst.RESET} />
      <Scene key="pageOne" component={PageOne} title="PageOne!!!" back onBack={() => Actions.InitPage()}/> */}

      <Scene key="JoinCustomerType" component={JoinCustomerType} title="고객 구분"/>
      <Scene key="JoinAccountType" component={JoinAccountType} title="가입 구분"/>
      <Scene key="JoinInputEmail" component={JoinInputEmail} title="이메일 가입" back onBack={() => Actions.JoinInputName()}/>
      <Scene key="JoinInputName" component={JoinInputName} title="고객 이름"/>
      <Scene key="JoinInputPhone" component={JoinInputPhone} title="전화번호"/>
      <Scene key="JoinInputPhoneAuth" component={JoinInputPhoneAuth} title="본인 인증"/>

      <Scene key="LoginAccountType" component={LoginAccountType} title="로그인 구분"/>
      <Scene key="LoginInputAccount" component={LoginInputAccount} title="이메일 로그인"/>

      {/* <Scene key="CardIndex" component={CardIndex} title="카드 등록 페이지" initial type={ActionConst.RESET}/>
      <Scene key="CardInputInfo" component={CardInputInfo} title="카드 등록"/> */}


      <Scene key="RegBusinessPlace" component={RegBusinessPlace} title="사업장 등록" initial type={ActionConst.RESET}/>
      <Scene key="SetAddress" component={SetAddress} title="주소" />
      <Scene key="InputAddress" component={InputAddress} title="주소 등록"/>
      <Scene key="SelectMapAddress" component={SelectMapAddress} title="장소 선택" />

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
          legacy
          backToInitial
          onTabOnPress={() => {
            console.log('Back to initial and also print this');
          }}
          swipeEnabled
          showLabel={true}
          activeBackgroundColor="white"
          inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
        >
          <Stack
            key="tab_1"
            title="Tab #1"
            tabBarLabel="TAB #1"
            inactiveBackgroundColor="#FFF"
            activeBackgroundColor="#DDD"
            navigationBarStyle={{ backgroundColor: 'green' }}
            titleStyle={{ color: 'white', alignSelf: 'center' }}
          >
            <Scene key="tab_1_1" component={TestPage1} title="Tab #1_1111" onRight={() => alert('Right button')} rightTitle="Right" />
          </Stack>

          <Stack key="tab_2" title="Tab #2"  initial>
            <Scene key="tab_2_1" component={TestPage2} title="Tab #2_1"/>
          </Stack>
        </Tabs>
      </Scene>

    </Drawer>

    </Scene>

    
  </Router>
);

export default PAGE;