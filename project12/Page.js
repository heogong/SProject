import React, {Component} from 'react';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';
import TabIcon from './src/Common/Components/TabIcon';

import TestInitPage from './src/FirstScreen/Pages/TestInitPage';
import TestPageOne from './src/FirstScreen/Pages/PageOne';


import IntroPage from './src';
import InitPage from './src/FirstScreen/Pages/InitPage';
import ServiceInfo from './src/FirstScreen/Pages/ServiceInfo';

import ClientAgreeTermsService from './src/FirstScreen/Pages/Join/Client/AgreeTermsService';
import PartnerAgreeTermsService from './src/FirstScreen/Pages/Join/Partner/AgreeTermsService';
import SuccessJoinPartner from './src/FirstScreen/Pages/Join/Partner/SuccessJoinPartner';


import SuccessAgreeTermsService from './src/FirstScreen/Pages/Join/SuccessAgreeTermsService';

import JoinCustomerType from './src/FirstScreen/Pages/Join/CustomerType';
import JoinAccountType from './src/FirstScreen/Pages/Join/AccountType';
import JoinInputEmail from './src/FirstScreen/Pages/Join/InputEmail';
import JoinInputName from './src/FirstScreen/Pages/Join/InputName';
import JoinInputPhone from './src/FirstScreen/Pages/Join/InputPhone';
import JoinInputPhoneAuth from './src/FirstScreen/Pages/Join/InputPhoneAuth';

import LoginAccountType from './src/FirstScreen/Pages/Login/AccountType';
import LoginInputAccount from './src/FirstScreen/Pages/Login/InputAccount';

// 비회원
import NonMemberNoticeInfoService from './src/FirstScreen/Pages/Join/NonMember/NoticeInfoService';

// 파트너
import PartnerIndex from './src/FirstScreen/Pages/Join/Partner'; // 파트너 사업장 등록
import JoinInputBizLicense from './src/FirstScreen/Pages/Join/Partner/InputBizLicense'; // 파트너 사업자등록증 등록1
import JoinTakeBizLicense from './src/FirstScreen/Pages/Join/Partner/TakeBizLicense'; // 파트너 사업자등록증 등록2
import JoinInputPartnerInfo from './src/FirstScreen/Pages/Join/Partner/InputPartnerInfo'; // 파트너 사업자등록증 등록3

import JoinSetPartnerAddress from './src/FirstScreen/Pages/Join/Partner/SetAddress'; // 파트너 주소 등록
import JoinSearchPartnerAddress from './src/FirstScreen/Pages/Join/Partner/SearchAddress'; // 파트너 주소 검색

import JoinInputProdType from './src/FirstScreen/Pages/Join/Partner/InputProdType'; // 파트너 제품타입 선택
import JoinInputWorkHours from './src/FirstScreen/Pages/Join/Partner/InputWorkHours'; // 파트너 근무시간 선택

import JoinInputSettleAccount1 from './src/FirstScreen/Pages/Join/Partner/InputSettleAccount1'; // 파트너 정산 계좌1
import JoinInputSettleAccount2 from './src/FirstScreen/Pages/Join/Partner/InputSettleAccount2'; // 파트너 정산 계좌2
import JoinInputSettleAccount3 from './src/FirstScreen/Pages/Join/Partner/InputSettleAccount3'; // 파트너 정산 계좌3
import JoinInputPartnerInfoSuccess from './src/FirstScreen/Pages/Join/Partner/InputPartnerInfoSuccess'; // 파트너 사업정보 입력완료

import CardIndex from './src/FirstScreen/Pages/Card';
import CardInputInfo from './src/FirstScreen/Pages/Card/InputCardInfo';
import SuccessCardInfo from './src/FirstScreen/Pages/Card/SuccessCardInfo';
import CardListInfo from './src/FirstScreen/Pages/Card/ListCardInfo';

import PartnerHome from './src/Main/Pages/Partner/Home';
import AfterServiceState from './src/Main/Pages/Partner/AfterService';

import TakeBeforeAfterService from './src/Main/Pages/Partner/AfterService/TakeBeforeAfterService'; // 조치전 이미지 등록
import ListAfterServiceMatch from './src/Main/Pages/Partner/AfterService/ListAfterServiceMatch'; // A/S 신청 리스트
import ViewAfterServiceMatch from './src/Main/Pages/Partner/AfterService/ViewAfterServiceMatch'; // A/S 신청 업체 상세
import ViewAfterServiceState from './src/Main/Pages/Partner/AfterService/ViewAfterServiceState'; // A/S 매칭 후 상태정보
import RegAfterServiceAdd from './src/Main/Pages/Partner/AfterService/RegAfterServiceAdd'; // 추가 A/S 내역


// 파트너 A/S 보고서
import AfterServiceReport from './src/Main/Pages/Partner/Report';
import ListInCompleteReport from './src/Main/Pages/Partner/Report/ListInCompleteReport';
import RegReportAfterService from './src/Main/Pages/Partner/Report/RegReportAfterService';
import RegReportAfterService2 from './src/Main/Pages/Partner/Report/RegReportAfterService2';
import RegAddAfterService from './src/Main/Pages/Partner/Report/RegAddAfterService';

import DrawerContent from './src/Main/Components/DrawerContent'
import MenuIcon from './src/Main/Images/menu_burger.png'

import ReactCamera from './src/Main/Components/ReactCamera';
import ViewImage from './src/Main/Components/ViewImage';

// 파트너 더보기
import PartnerMoreInfo from './src/Main/Pages/Partner/MoreInfo/';
import MyProfileInfo from './src/Main/Pages/Partner/MoreInfo/MyProfileInfo';
import MyProfileModPassword1 from './src/Main/Pages/Partner/MoreInfo/MyProfileModPassword1';
import MyProfileModPassword2 from './src/Main/Pages/Partner/MoreInfo/MyProfileModPassword2';
import MyProfileModPhone from './src/Main/Pages/Partner/MoreInfo/MyProfileModPhone';
import MyProfileModName from './src/Main/Pages/Partner/MoreInfo/MyProfileModName';
import MyProfileExit1 from './src/Main/Pages/Partner/MoreInfo/MyProfileExit1';
import MyProfileExit2 from './src/Main/Pages/Partner/MoreInfo/MyProfileExit2';
import MyCalcuList from './src/Main/Pages/Partner/MoreInfo/MyCalcuList';
import NoticeList from './src/Main/Pages/Partner/MoreInfo/NoticeList';
import TermsMenu from './src/Main/Pages/Partner/MoreInfo/TermsMenu';
import TermsContent1 from './src/Main/Pages/Partner/MoreInfo/TermsContent1';


/**클라이언트 */

import ClientHome from './src/Main/Pages/Client/Home'; // 클라이언트 HOME

// 사업장
import ClientIndex from './src/FirstScreen/Pages/Join/Client'
import JoinListBusinessPlace from './src/FirstScreen/Pages/Join/Client/ListBusinessPlace'
// 사업장 조회
// import ViewBusinessPlace from './src/FirstScreen/Pages/Join/Client/ViewBusinessPlace'

// 사업장 등록
import RegBusinessPlaceIndex from './src/FirstScreen/Pages/Join/Client/RegBusinessPlaceIndex'
import RegBusinessPlace from './src/FirstScreen/Pages/Join/Client/RegBusinessPlace'
import SetBusinessPlace from './src/FirstScreen/Pages/Join/Client/SetBusinessPlace'

// 사업장 주소등록
import SetAddress from './src/FirstScreen/Pages/Join/Client/Address/SetAddress'
import SearchAddress from './src/FirstScreen/Pages/Join/Client/Address/SearchAddress'

/**제품 */
import InputProdType from './src/FirstScreen/Pages/Join/Client/Product/InputProdType' // 제품 타입등록
import InputShowCase from './src/FirstScreen/Pages/Join/Client/Product/InputShowCase' // 쇼케이스 등록
import TakeProductImage from './src/FirstScreen/Pages/Join/Client/Product/TakeProductImage' // 보유제품 사진 촬영
import TakeProductGuide1 from './src/FirstScreen/Pages/Join/Client/Product/TakeProductGuide1' // 보유제품 사진 촬영


import InputProdInfo from './src/FirstScreen/Pages/Join/Client/Product/InputProdInfo' // 제품 등록 (?)
import InputProdImage from './src/FirstScreen/Pages/Join/Client/Product/InputProdImage' // 제품 이미지 등록 (?)


 // 메인 AS : 등록된 사업장별 제품 타입
import AfterServiceProdTypeList from './src/Main/Pages/Client/AfterService/ListBusinessProductType'
import AfterServiceProdList from './src/Main/Pages/Client/AfterService/ListBusinessProduct'
import AfterServiceApplyProduct from './src/Main/Pages/Client/AfterService/ApplyBusinessProduct'
import AfterServiceApplyProductCheck from './src/Main/Pages/Client/AfterService/ApplyCheckAfterService'
import AfterServiceApplyProductComplete from './src/Main/Pages/Client/AfterService/ApplyAfterServiceComplete'

// import ViewBusinessProduct from './src/Main/Pages/Client/MyProduct/ViewBusinessProduct'

// 메인 나의제품 : 사업장 목록
import ListBusinessPlace from './src/Main/Pages/Client/MyProduct/ListBusinessPlace'
import ListBusinessProductType from './src/Main/Pages/Client/MyProduct/ListBusinessProductType'
import ListBusinessShowCase from './src/Main/Pages/Client/MyProduct/ListBusinessShowCase'
import InputBusinessProdType from './src/Main/Pages/Client/MyProduct/InputProdType'
import RegBusinessShowCase from './src/Main/Pages/Client/MyProduct/RegBusinessShowCase'
import RegBusinessAddress from './src/Main/Pages/Client/MyProduct/RegBusinessAddress'
import EditBusinessAddress from './src/Main/Pages/Client/MyProduct/EditBusinessAddress'

// 메인 A/S 현황
import ClientAfterServiceState from './src/Main/Pages/Client/AfterServiceState'
import ClientViewAfterServiceState from './src/Main/Pages/Client/AfterServiceState/ViewAfterServiceState'
import AfterServiceHistory from './src/Main/Pages/Client/AfterServiceState/ListAfterServiceHistory'
import ViewAfterServiceHistory from './src/Main/Pages/Client/AfterServiceState/ViewAfterServiceHistory'


// 더보기
import ClientMoreInfo from './src/Main/Pages/Client/MoreInfo'


const PAGE = () => ( 
  
  <Router>
    <Stack hideNavBar transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
      <Scene key="TestInitPage" component={TestInitPage} type={ActionConst.RESET} />
      <Scene key="TestPageOne"  component={TestPageOne} title="TestPageOne" type={ActionConst.RESET} />

      <Scene key="IntroPage"  component={IntroPage} title="IntroPage" type={ActionConst.RESET} />
      <Scene key="InitPage"  component={InitPage} type={ActionConst.RESET} />
      
      {/* 안내페이지 */}
      <Scene key="ServiceInfo" component={ServiceInfo} />
      <Scene key="NonMemberNoticeInfoService" component={NonMemberNoticeInfoService} />
      
      {/* 약관동의 */}
      <Scene key="PartnerAgreeTermsService" component={PartnerAgreeTermsService} />
      <Scene key="SuccessJoinPartner" component={SuccessJoinPartner} />
      <Scene key="ClientAgreeTermsService"  component={ClientAgreeTermsService} />
      
      {/* <Scene key="PartnerTermsService" component={PartnerTermsService} />
      <Scene key="SuccessAgreeTermsService"  component={SuccessAgreeTermsService} type={ActionConst.RESET}/> */}

      <Scene key="reactCamera" component={ReactCamera} />
      <Scene key="ViewImage" component={ViewImage} />
      
      <Scene key="JoinCustomerType" component={JoinCustomerType} />
      <Scene key="JoinAccountType" component={JoinAccountType} />
      <Scene key="JoinInputEmail" component={JoinInputEmail} back onBack={() => Actions.JoinInputName()} />
      <Scene key="JoinInputName"  component={JoinInputName} />
      <Scene key="JoinInputPhone"  component={JoinInputPhone} />
      <Scene key="JoinInputPhoneAuth"  component={JoinInputPhoneAuth} />
      
      {/* 파트너 회원가입 */}
      <Scene key="PartnerIndex" component={PartnerIndex} type={ActionConst.RESET}/>
      <Scene key="JoinInputBizLicense" component={JoinInputBizLicense} type={ActionConst.RESET}/>
      <Scene key="JoinTakeBizLicense" component={JoinTakeBizLicense}/>
      <Scene key="JoinInputPartnerInfo" component={JoinInputPartnerInfo}/>
      <Scene key="JoinSetPartnerAddress" component={JoinSetPartnerAddress} />
      <Scene key="JoinSearchPartnerAddress" component={JoinSearchPartnerAddress} />
      
      <Scene key="JoinInputProdType"  component={JoinInputProdType} />
      <Scene key="JoinInputWorkHours" component={JoinInputWorkHours} type={ActionConst.RESET}/>
      <Scene key="JoinInputSettleAccount" component={JoinInputSettleAccount1} type={ActionConst.RESET}/>
      <Scene key="JoinInputSettleAccount2" component={JoinInputSettleAccount2} />
      <Scene key="JoinInputSettleAccount3" component={JoinInputSettleAccount3} />
      <Scene key="JoinInputPartnerInfoSuccess" component={JoinInputPartnerInfoSuccess} />
      
      <Scene key="LoginAccountType" component={LoginAccountType} back onBack={() => Actions.InitPage()}/>
      <Scene key="LoginInputAccount" component={LoginInputAccount} />

      <Scene key="CardIndex"  component={CardIndex} type={ActionConst.RESET}/>
      <Scene key="CardInputInfo"  component={CardInputInfo} />
      <Scene key="SuccessCardInfo"  component={SuccessCardInfo} type={ActionConst.RESET} />
      <Scene key="CardListInfo"  component={CardListInfo} />

      {/* 클라이언트 */}
      <Scene key="ClientIndex" component={ClientIndex} type={ActionConst.RESET} />
      <Scene key="ListBusinessPlace" component={JoinListBusinessPlace} type={ActionConst.RESET} />
      
      {/* 사업장등록 */}
      <Scene key="RegBusinessPlaceIndex"  component={RegBusinessPlaceIndex} />
      <Scene key="RegBusinessPlace"  component={RegBusinessPlace} />
      <Scene key="SetBusinessPlace" component={SetBusinessPlace} />
      <Scene key="SetAddress"  component={SetAddress} />
      <Scene key="SearchAddress"  component={SearchAddress} />

      {/* <Scene key="ViewBusinessPlace" hideNavBar component={ViewBusinessPlace} title="사업장 조회"/> */}

      {/* 제품 등록 */}
      <Scene key="InputProdType" component={InputProdType} type={ActionConst.RESET} />
      <Scene key="InputShowCase" component={InputShowCase} /> 
      <Scene key="TakeProductImage"  component={TakeProductImage} />
      <Scene key="TakeProductGuide1"  component={TakeProductGuide1} />


      {/* 클라이언트 - AS 신청 제품 타입 */}
      <Scene key="AfterServiceProdTypeList" component={AfterServiceProdTypeList} />
      <Scene key="AfterServiceProdList" component={AfterServiceProdList} />
      <Scene key="AfterServiceApplyProduct" component={AfterServiceApplyProduct} />
      <Scene key="AfterServiceApplyProductCheck" component={AfterServiceApplyProductCheck} />
      <Scene key="AfterServiceApplyProductComplete" component={AfterServiceApplyProductComplete} />

      {/* <Scene key="InputProdInfo" component={InputProdInfo} onRight={()=>{}} rightTitle={'Save'}/>
      <Scene key="InputProdImage" component={InputProdImage} type={ActionConst.RESET} /> */}
      

      {/* 파트너 - A/S 보고서 등록 */}
      <Scene key="TakeBeforeAfterService" component={TakeBeforeAfterService} />
      <Scene key="RegReportAfterService" component={RegReportAfterService} /> 
      <Scene key="RegReportAfterService2"  component={RegReportAfterService2} /> 
      <Scene key="RegAddAfterService" component={RegAddAfterService} /> 
      {/* 미 완료 보고서 리스트 */}
      <Scene key="ListInCompleteReport"   component={ListInCompleteReport} />

      {/* 파트너 - A/S 리스트 */}
      <Scene key="AfterServiceMatch"  component={ListAfterServiceMatch} />
      <Scene key="ViewAfterServiceMatch"  component={ViewAfterServiceMatch} />

      {/* 파트너 - 더보기 */}
      <Scene key="PartnerMoreInfo" initial component={PartnerMoreInfo} />
      <Scene key="MyProfileInfo" component={MyProfileInfo} />
      <Scene key="MyProfileModPassword1"  component={MyProfileModPassword1} />
      <Scene key="MyProfileModPassword2" component={MyProfileModPassword2} />
      <Scene key="MyProfileModPhone" component={MyProfileModPhone} />
      <Scene key="MyProfileModName" component={MyProfileModName} />
      <Scene key="MyProfileExit1"  component={MyProfileExit1} />
      <Scene key="MyProfileExit2" component={MyProfileExit2} />
      <Scene key="MyCalcuList"  component={MyCalcuList} />
      <Scene key="NoticeList" component={NoticeList} />
      <Scene key="TermsMenu" component={TermsMenu} />
      <Scene key="TermsContent1" component={TermsContent1} />
      
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
        <Scene hideNavBar panHandlers={null} >

          {/* 클라이언트 */}
          <Tabs
            key="tabbar"
            routeName="tabbar"
            // backToInitial
            onTabOnPress={() => {
              console.log('Back to initial and also print this');
            }}
            swipeEnabled
            showLabel={true}
            activeBackgroundColor="white"
            inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
            tabBarPosition="bottom"
          >
            <Stack key="ClientMain" hideNavBar title="클라이언트 Title" icon={TabIcon} 
            tabBarOnPress={() => Actions.ClientHome({type:ActionConst.RESET})}
            transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ClientHome" component={ClientHome} />
              {/* <Scene key="AfterServiceProdTypeList" hideNavBar component={AfterServiceProdTypeList} title="사업장 별 제품 타입 조회"/> */}
              {/* <Scene key="AfterServiceProdList" hideNavBar component={AfterServiceProdList} title="제품 조회"/> */}
              {/* <Scene key="AfterServiceApplyProduct" hideNavBar component={AfterServiceApplyProduct} title="AS 신청"/> */}
              {/* <Scene key="AfterServiceApplyProductCheck" hideNavBar component={AfterServiceApplyProductCheck} title="AS 신청 확인"/> */}
              {/* <Scene key="AfterServiceApplyProductComplete" hideNavBar component={AfterServiceApplyProductComplete} title="AS 신청 완료"/> */}
            </Stack>

            {/* 나의제품 */}
            <Stack key="clientMyProduct" hideNavBar title="나의제품" icon={TabIcon}
              tabBarOnPress={() => Actions.ListBusinessPlace({type:ActionConst.RESET}) }
              transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ListBusinessPlace" component={ListBusinessPlace} title="사업장 목록" />
              <Scene key="ListBusinessProductType" component={ListBusinessProductType} title="사업장 제품 타입 목록" />
              <Scene key="ListBusinessShowCase" component={ListBusinessShowCase} title="사업장 제품 목록" />
              <Scene key="InputBusinessProdType" component={InputBusinessProdType} title="제품 타입 선택" />
              
              {/*join 페이지 공통 사용*/}
              <Scene key="RegBusinessPlace" component={RegBusinessPlace} title="사업장 등록" /> 
              {/*join 페이지 공통 사용*/}
              <Scene key="SearchAddress" hideNavBar component={SearchAddress} title="주소 검색"/>

              <Scene key="SetAddress" component={RegBusinessAddress} title="사업장 주소 등록" />
              <Scene key="EditBusinessAddress" component={EditBusinessAddress} title="사업장 주소 수정" />
              
              <Scene key="RegBusinessShowCase" component={RegBusinessShowCase} title="제품 쇼케이스 등록" />
            </Stack>

            <Stack key="AfterServiceState" hideNavBar title="A/S 현황" icon={TabIcon} 
              tabBarOnPress={() => Actions.ClientAfterServiceState({type:ActionConst.RESET})}
              transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ClientAfterServiceState" component={ClientAfterServiceState}/>
              <Scene key="ViewAfterServiceState" component={ClientViewAfterServiceState}/>
              <Scene key="AfterServiceHistory" component={AfterServiceHistory}/>
              <Scene key="ViewAfterServiceHistory" component={ViewAfterServiceHistory}/>
            </Stack>

            <Stack key="ClientMore" hideNavBar title="더보기" icon={TabIcon} transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ClientInfo_tab" component={ClientMoreInfo}/>
            </Stack>
          </Tabs>
        </Scene>

        <Scene hideNavBar panHandlers={null} >
          {/* 파트너 */}
          <Tabs
              key="tabbar2"
              routeName="tabbar2"
              // backToInitial
              onTabOnPress={() => {
                console.log('Back to initial and also print this');
              }}
              swipeEnabled
              showLabel={true}
              activeBackgroundColor="white"
              inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
              tabBarPosition="bottom"
            >
              <Stack key="PartnerMain" hideNavBar title="파트너 Title" initial icon={TabIcon}
                tabBarOnPress={() => Actions.PartnerHome({type:ActionConst.RESET})}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                <Scene key="PartnerHome" component={PartnerHome} title=""/>
              </Stack>

              {/* A/S 매칭 */}
              <Stack key="PartnerAfterService" hideNavBar title="A/S 매칭" icon={TabIcon} 
                tabBarOnPress={() => Actions.PAfterServiceState({type:ActionConst.RESET})}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                <Scene key="PAfterServiceState" component={AfterServiceState} title="A/S 상태 체크"/>
                {/* <Scene key="AfterServiceMatch" component={ListAfterServiceMatch} title="A/S 매칭"/> */}
                {/* <Scene key="ViewAfterServiceMatch" component={ViewAfterServiceMatch} title="A/S 매칭 상세"/> */}
                <Scene key="ViewAfterServiceState" component={ViewAfterServiceState} title="A/S 매칭 후 상태"/>
                <Scene key="RegAfterServiceAdd" component={RegAfterServiceAdd} title="추가 A/S"/>
              </Stack>

              <Stack key="PartnerReport" hideNavBar title="보고서" icon={TabIcon}
                tabBarOnPress={() => alert("개발중")}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                {/* <Scene key="ListInCompleteReport" component={ListInCompleteReport} title="미 완료 보고서 리스트"/> */}
                <Scene key="AfterServiceReport" component={AfterServiceReport} title="A/S 보고서"/>
              </Stack>
            </Tabs>
        </Scene>

      </Drawer>
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

