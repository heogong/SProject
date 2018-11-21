import React, {Component} from 'react';
import {Actions, Scene, Router, Stack, Overlay, ActionConst} from 'react-native-router-flux';
import InitPage from './src/LOGIN/pages/InitPage';
import PageOne from './src/LOGIN/pages/PageOne';

import JoinCustomerType from './src/LOGIN/pages/JOIN/CustomerType';
import JoinAccountType from './src/LOGIN/pages/JOIN/AccountType';
import JoinInputEmail from './src/LOGIN/pages/JOIN/InputEmail';
import JoinInputName from './src/LOGIN/pages/JOIN/InputName';
import JoinInputPhone from './src/LOGIN/pages/JOIN/InputPhone';
import JoinInputPhoneAuth from './src/LOGIN/pages/JOIN/InputPhoneAuth';

import CardIndex from './src/CARD/pages';
import CardInputInfo from './src/CARD/pages/InputCardInfo';

const PAGE = () => ( 
  <Router>
    <Scene key="root">
      {/* <Scene key="InitPage" component={InitPage} title="InitPage" initial type={ActionConst.RESET} /> */}
      <Scene key="pageOne" component={PageOne} title="PageOne!!!" back onBack={() => Actions.InitPage()}/>

      <Scene key="JoinCustomerType" component={JoinCustomerType} title="고객 구분"/>
      <Scene key="JoinAccountType" component={JoinAccountType} title="가입 구분"/>
      <Scene key="JoinInputEmail" component={JoinInputEmail} title="이메일 가입" back onBack={() => Actions.JoinInputName()}/>
      <Scene key="JoinInputName" component={JoinInputName} title="고객 이름"/>
      <Scene key="JoinInputPhone" component={JoinInputPhone} title="전화번호"/>
      <Scene key="JoinInputPhoneAuth" component={JoinInputPhoneAuth} title="본인 인증"/>

      <Scene key="CardIndex" component={CardIndex} title="카드 등록 페이지" initial type={ActionConst.RESET}/>
      <Scene key="CardInputInfo" component={CardInputInfo} title="카드 등록"/>

    </Scene>
  </Router>
);

export default PAGE;