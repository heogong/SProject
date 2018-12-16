import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';
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

import JoinInputProdType from './src/FirstScreen/Pages/Join/Partner/InputProdType'; // 파트너 제품타입 선택
import JoinInputWorkHours from './src/FirstScreen/Pages/Join/Partner/InputWorkHours'; // 파트너 근무시간 선택

import CardIndex from './src/Card/Pages';
import CardInputInfo from './src/Card/Pages/InputCardInfo';

import DrawerContent from './src/Main/Components/DrawerContent'
import MenuIcon from './src/Main/Images/menu_burger.png'
//test
import TestPage1 from './src/Main/Pages/TestPage1'
import TestPage2 from './src/Main/Pages/TestPage2'
import TestPage3 from './src/Main/Pages/TestPage3'
//test

import ReactCamera from './src/Main/Components/ReactCamera';

/**사업장 */
// 사업장 목록
import ListBusinessPlace from './src/Main/Pages/Business/ListBusinessPlace'
// 사업장 등록
import RegBusinessPlace from './src/Main/Pages/Business/RegBusinessPlace'
// 사업장 주소등록
import SetAddress from './src/Main/Pages/Business/Address/SetAddress'
import InputAddress from './src/Main/Pages/Business/Address/InputAddress'

/**제품 */
import InputProdType from './src/Main/Pages/Business/Product/InputProdType' // 제품 타입등록
import InputProdInfo from './src/Main/Pages/Business/Product/InputProdInfo' // 제품 등록
import InputProdImage from './src/Main/Pages/Business/Product/InputProdImage' // 제품 이미지 등록


const PAGE = () => ( 
  
  <Router>
    <Scene>
      <Scene key="InitPage" component={InitPage} title="InitPage" initial type={ActionConst.RESET} />
      <Scene key="pageOne" component={PageOne} title="PageOne!!!" back onBack={() => Actions.InitPage()}/>
      <Scene key="reactCamera" component={ReactCamera} hideNavBar={true}/>
      
      <Scene key="JoinCustomerType" component={JoinCustomerType} title="고객 구분"/>
      <Scene key="JoinAccountType" component={JoinAccountType} title="가입 구분"/>
      <Scene key="JoinInputEmail" component={JoinInputEmail} title="이메일 가입" back onBack={() => Actions.JoinInputName()} />
      <Scene key="JoinInputName" component={JoinInputName} title="고객 이름"/>
      <Scene key="JoinInputPhone" component={JoinInputPhone} title="전화번호"/>
      <Scene key="JoinInputPhoneAuth" component={JoinInputPhoneAuth} title="본인 인증"/>
      
      {/* 파트너 회원가입 */}
      <Scene key="JoinInputProdType" component={JoinInputProdType} title="파트너 회원가입 제품 선택" />
      <Scene key="JoinInputWorkHours" component={JoinInputWorkHours} title="근무시간" type={ActionConst.RESET}/>
      
      <Scene key="LoginAccountType" component={LoginAccountType} title="로그인 구분" back onBack={() => Actions.InitPage()}/>
      <Scene key="LoginInputAccount" component={LoginInputAccount} title="이메일 로그인"/>

      {/* <Scene key="CardIndex" component={CardIndex} title="카드 등록 페이지" initial type={ActionConst.RESET}/>
      <Scene key="CardInputInfo" component={CardInputInfo} title="카드 등록"/> */}


      <Scene key="ListBusinessPlace" component={ListBusinessPlace} title="사업장 목록" type={ActionConst.RESET} onRight={() => Actions.RegBusinessPlace()} rightTitle="추가" />
      <Scene key="RegBusinessPlace" component={RegBusinessPlace} title="사업장 등록"/>
      <Scene key="SetAddress" component={SetAddress} title="주소" />
      <Scene key="InputAddress" component={InputAddress} title="주소 등록"/>
      <Scene key="InputProdType" component={InputProdType} title="제품 타입 등록" back onBack={() => Actions.ListBusinessPlace()} />
      <Scene key="InputProdInfo" component={InputProdInfo} title="제품 등록" onRight={()=>{}} rightTitle={'Save'}/>
      <Scene key="InputProdImage" component={InputProdImage} title="제품 이미지 등록" />

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
