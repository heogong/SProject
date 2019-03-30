import React, {Component} from 'react';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import {Actions, Scene, Router, Stack, Overlay, ActionConst, Drawer, Tabs} from 'react-native-router-flux';
import TabIcon from './src/Common/Components/TabIcon';

import TestInitPage from './src/FirstScreen/Pages/TestInitPage';
import TestPageOne from './src/FirstScreen/Pages/PageOne';

import IntroPage from './src';
import InitPage from './src/FirstScreen/Pages/InitPage';
import ResetMain from './src/Main/Pages/ResetMain';

import ServiceIntroduce from './src/FirstScreen/Pages/ServiceIntroduce';

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

import InvaildId from './src/FirstScreen/Pages/InvaildId';

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
import NoticeList from './src/Main/Pages/Partner/MoreInfo/Notice/';
import NoticeDetail from './src/Main/Pages/Partner/MoreInfo/Notice/NoticeDetail';
import TermsMenu from './src/Main/Pages/Partner/MoreInfo/TermsMenu';
import TermsContent1 from './src/Main/Pages/Partner/MoreInfo/TermsContent1';
import MyProfileCompany from './src/Main/Pages/Partner/MoreInfo/MyProfileCompany';

// 파트너 가이드
import PartnerGuide1 from './src/Main/Pages/Partner/Home/PartnerGuide1';
import PartnerGuide1Sub from './src/Main/Pages/Partner/Home/PartnerGuide1_sub';
import PartnerGuide2 from './src/Main/Pages/Partner/Home/PartnerGuide2';
import PartnerGuide2Sub from './src/Main/Pages/Partner/Home/PartnerGuide2_sub';
import PartnerGuide3 from './src/Main/Pages/Partner/Home/PartnerGuide3';
import PartnerGuide3Sub from './src/Main/Pages/Partner/Home/PartnerGuide3_sub';


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
import SuccessRegProduct from './src/FirstScreen/Pages/Join/Client/Product/SuccessRegProduct' // 제품등록완료

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
import RegBusinessAddress from './src/Main/Pages/Client/MyProduct/RegBusinessAddress'
import EditBusinessAddress from './src/Main/Pages/Client/MyProduct/EditBusinessAddress'

import MyListBusinessPlace from './src/Main/Pages/Client/MyProduct/ListBusinessPlace';
import MyListBusinessProductType from './src/Main/Pages/Client/MyProduct/ListBusinessProductType';
import MyListBusinessProduct from './src/Main/Pages/Client/MyProduct/ListBusinessProduct';
import MyEditProdShowCase from './src/Main/Pages/Client/MyProduct/EditProdShowCase';

import MyRegBusinessPlace from './src/Main/Pages/Client/MyProduct/RegBusinessPlace';
import MyRegBusinessProdType from './src/Main/Pages/Client/MyProduct/RegProdType';


// 메인 A/S 현황
import ClientAfterServiceState from './src/Main/Pages/Client/AfterServiceState'
import ClientViewAfterServiceState from './src/Main/Pages/Client/AfterServiceState/ViewAfterServiceState'
import AfterServiceHistory from './src/Main/Pages/Client/AfterServiceState/ListAfterServiceHistory'
import ViewAfterServiceHistory from './src/Main/Pages/Client/AfterServiceState/ViewAfterServiceHistory'


// 클라이언트 - 더보기
import ClientMoreInfo from './src/Main/Pages/Client/MoreInfo';
import ClientMoreListBusiness from './src/Main/Pages/Client/MoreInfo/ListBusinessPlace';
import ClientMyProfileExit1 from './src/Main/Pages/Client/MoreInfo/MyProfileExit1';
import ClientMyProfileExit2 from './src/Main/Pages/Client/MoreInfo/MyProfileExit2';
import ClientMyProfileInfo from './src/Main/Pages/Client/MoreInfo/MyProfileInfo';
import ClientMyProfileModName from './src/Main/Pages/Client/MoreInfo/MyProfileModName';
import ClientMyProfileModPassword1 from './src/Main/Pages/Client/MoreInfo/MyProfileModPassword1';
import ClientMyProfileModPassword2 from './src/Main/Pages/Client/MoreInfo/MyProfileModPassword2';
import ClientMyProfileModPhone from './src/Main/Pages/Client/MoreInfo/MyProfileModPhone';
import ClientNoticeList from './src/Main/Pages/Client/MoreInfo/Notice/';
import ClientNoticeDetail from './src/Main/Pages/Client/MoreInfo/Notice/NoticeDetail';
import ClientTermsContent1 from './src/Main/Pages/Client/MoreInfo/TermsContent1';
import ClientTermsMenu from './src/Main/Pages/Client/MoreInfo/TermsMenu';


const PAGE = () => ( 
  
  <Router>
    <Stack hideNavBar transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
      <Scene key="TestInitPage" component={TestInitPage} type={ActionConst.RESET} />
      <Scene key="TestPageOne"  component={TestPageOne} title="TestPageOne" type={ActionConst.RESET} />

      <Scene key="IntroPage" initial component={IntroPage} type={ActionConst.RESET} />
      <Scene key="InitPage"  component={InitPage} type={ActionConst.RESET} />
      <Scene key="ResetMain"  component={ResetMain} type={ActionConst.RESET} />
      
      {/* 안내페이지 */}
      <Scene key="ServiceIntroduce" component={ServiceIntroduce} />
      <Scene key="NonMemberNoticeInfoService" component={NonMemberNoticeInfoService} />
      
      {/* 약관동의 */}
      <Scene key="PartnerAgreeTermsService" component={PartnerAgreeTermsService} />
      <Scene key="SuccessJoinPartner" component={SuccessJoinPartner} />
      <Scene key="ClientAgreeTermsService" component={ClientAgreeTermsService} />
      
      {/* <Scene key="PartnerTermsService" component={PartnerTermsService} />*/}
      <Scene key="SuccessAgreeTermsService"  component={SuccessAgreeTermsService} type={ActionConst.RESET}/> 

      <Scene key="reactCamera" component={ReactCamera} />
      <Scene key="ViewImage" component={ViewImage} />

      <Scene key="InvaildId" component={InvaildId} />

      <Scene key="JoinCustomerType" component={JoinCustomerType} />
      <Scene key="JoinAccountType" component={JoinAccountType} />
      <Scene key="JoinInputEmail" component={JoinInputEmail} />
      <Scene key="JoinInputName"  component={JoinInputName} />
      <Scene key="JoinInputPhone"  component={JoinInputPhone} />
      <Scene key="JoinInputPhoneAuth"  component={JoinInputPhoneAuth} />
      
      {/* 파트너 회원가입 */}
      <Scene key="PartnerIndex" component={PartnerIndex} type={ActionConst.RESET}/>
      <Scene key="JoinInputBizLicense" component={JoinInputBizLicense} type={ActionConst.RESET}/>
      <Scene key="JoinTakeBizLicense" component={JoinTakeBizLicense}/>
      <Scene key="JoinInputPartnerInfo" component={JoinInputPartnerInfo} type={ActionConst.RESET}/>
      <Scene key="JoinSetPartnerAddress" component={JoinSetPartnerAddress} type={ActionConst.RESET}/>
      <Scene key="JoinSearchPartnerAddress" component={JoinSearchPartnerAddress} />
      
      <Scene key="JoinInputProdType" component={JoinInputProdType} type={ActionConst.RESET}/>
      <Scene key="JoinInputWorkHours" component={JoinInputWorkHours} />
      <Scene key="JoinInputSettleAccount"  component={JoinInputSettleAccount1} />
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
      <Scene key="RegBusinessPlaceIndex" component={RegBusinessPlaceIndex} />
      <Scene key="RegBusinessPlace" component={RegBusinessPlace} />
      <Scene key="SetBusinessPlace" component={SetBusinessPlace} type={ActionConst.RESET} />
      <Scene key="SetAddress"  component={SetAddress} />
      <Scene key="SearchAddress"  component={SearchAddress} />

      {/* <Scene key="ViewBusinessPlace" hideNavBar component={ViewBusinessPlace} title="사업장 조회"/> */}

      {/* 제품 등록 */}
      <Scene key="InputProdType" component={InputProdType} />
      <Scene key="InputShowCase" component={InputShowCase} /> 
      <Scene key="TakeProductImage"  component={TakeProductImage} />
      <Scene key="TakeProductGuide1" component={TakeProductGuide1} />
      <Scene key="SuccessRegProduct" component={SuccessRegProduct} type={ActionConst.RESET}/>


      {/* 클라이언트 - AS 신청 제품 타입 */}
      <Scene key="AfterServiceProdTypeList"  component={AfterServiceProdTypeList} />
      <Scene key="AfterServiceProdList" component={AfterServiceProdList} />
      <Scene key="AfterServiceApplyProduct" component={AfterServiceApplyProduct} />
      <Scene key="AfterServiceApplyProductCheck"  component={AfterServiceApplyProductCheck} />
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
      <Scene key="MyProfileInfo" component={MyProfileInfo} />
      <Scene key="MyProfileModPassword1"  component={MyProfileModPassword1} />
      <Scene key="MyProfileModPassword2" component={MyProfileModPassword2} />
      <Scene key="MyProfileModPhone" component={MyProfileModPhone} />
      <Scene key="MyProfileModName" component={MyProfileModName} />
      <Scene key="MyProfileExit1"  component={MyProfileExit1} />
      <Scene key="MyProfileExit2" component={MyProfileExit2} />
      <Scene key="MyCalcuList"  component={MyCalcuList} />
      <Scene key="NoticeList" component={NoticeList} />
      <Scene key="NoticeDetail" component={NoticeDetail} />
      <Scene key="TermsMenu" component={TermsMenu} />
      <Scene key="TermsContent1" component={TermsContent1} />
      <Scene key="MyProfileCompany" component={MyProfileCompany} />

      {/* 파트너 - 가이드 */}
      <Scene key="PartnerGuide1" component={PartnerGuide1} />
      <Scene key="PartnerGuide1Sub" component={PartnerGuide1Sub} />
      <Scene key="PartnerGuide2" component={PartnerGuide2} />
      <Scene key="PartnerGuide2Sub" component={PartnerGuide2Sub} />
      <Scene key="PartnerGuide3" component={PartnerGuide3} />
      <Scene key="PartnerGuide3Sub" component={PartnerGuide3Sub} />


      {/* 클라이언트 A/S 내역 */}
      <Scene key="AfterServiceHistory" component={AfterServiceHistory} back onBack={() => Actions.popTo("ClientMain") }/>
      <Scene key="ViewAfterServiceHistory" component={ViewAfterServiceHistory}/>

      {/* 클라이언트 더보기 - 나의 사업자정보  */}
      <Scene key="ClientMyProfileInfo" component={ClientMyProfileInfo} />
      <Scene key="ClientMoreListBusiness" component={ClientMoreListBusiness} />
      <Scene key="ClientMyProfileModPassword1"  component={ClientMyProfileModPassword1} />
      <Scene key="ClientMyProfileModPassword2" component={ClientMyProfileModPassword2} />
      <Scene key="ClientMyProfileModPhone" component={ClientMyProfileModPhone} />
      <Scene key="ClientMyProfileModName" component={ClientMyProfileModName} />
      <Scene key="ClientMyProfileExit1"  component={ClientMyProfileExit1} />
      <Scene key="ClientMyProfileExit2" component={ClientMyProfileExit2} />
      <Scene key="ClientNoticeList" component={ClientNoticeList} />
      <Scene key="ClientNoticeDetail" component={ClientNoticeDetail} />
      <Scene key="ClientTermsMenu" component={ClientTermsMenu} />
      <Scene key="ClientTermsContent1" component={ClientTermsContent1} />

      {/* 클라이언트 나의제품 */}
      <Scene key="MyListBusinessPlace" component={MyListBusinessPlace}/>
      <Scene key="MyListBusinessProductType" component={MyListBusinessProductType}/>
      <Scene key="MyListBusinessProduct" component={MyListBusinessProduct}/>
      <Scene key="MyEditProdShowCase" component={MyEditProdShowCase}/>
      <Scene key="MyRegBusinessPlace" component={MyRegBusinessPlace}/>
      <Scene key="MyRegBusinessProdType" component={MyRegBusinessProdType}/>
      <Scene key="EditBusinessAddress" component={EditBusinessAddress} />
      
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
            onTabOnPress={() => {
              console.log('Back to  and also print this');
            }}
            swipeEnabled
            showLabel={false}
            activeBackgroundColor="#fff"
            inactiveBackgroundColor="#fff"
            tabBarPosition="bottom"
          >
            <Stack initial key="ClientMain" hideNavBar iconImg={require("~/Common/Image/user_footer_icon/tab1.png")} icon={TabIcon} 
              tabBarOnPress={() => Actions.ClientHome({type:ActionConst.RESET})}
              transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ClientHome" component={ClientHome} />
            </Stack>

            {/* 나의제품 */}
            <Stack key="clientMyProduct" hideNavBar iconImg={require("~/Common/Image/user_footer_icon/tab2.png")} icon={TabIcon}
              tabBarOnPress={() => Actions.MyListBusinessPlace() }
              transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              {/* <Scene key="ListBusinessProductType" component={ListBusinessProductType} title="사업장 제품 타입 목록" /> */}
              {/* <Scene key="InputBusinessProdType" component={InputBusinessProdType} title="제품 타입 선택" /> */}
              
              {/*join 페이지 공통 사용*/}
              <Scene key="RegBusinessPlace" component={RegBusinessPlace} title="사업장 등록" /> 
              {/*join 페이지 공통 사용*/}
              <Scene key="SearchAddress" hideNavBar component={SearchAddress} title="주소 검색"/>

              <Scene key="SetAddress" component={RegBusinessAddress} title="사업장 주소 등록" />
              {/* <Scene key="EditBusinessAddress" component={EditBusinessAddress} title="사업장 주소 수정" /> */}
            </Stack>

            <Stack key="AfterServiceState" hideNavBar iconImg={require("~/Common/Image/user_footer_icon/tab3.png")} icon={TabIcon} 
              tabBarOnPress={() => Actions.ClientAfterServiceState({type:ActionConst.RESET})}
              transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ClientAfterServiceState" component={ClientAfterServiceState}/>
              <Scene key="ViewAfterServiceState" component={ClientViewAfterServiceState}/>
              {/* <Scene key="AfterServiceHistory" component={AfterServiceHistory}/> */}
            </Stack>

            <Stack key="ClientMore" hideNavBar iconImg={require("~/Common/Image/user_footer_icon/tab4.png")} icon={TabIcon} 
              transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
              <Scene key="ClientInfo_tab" component={ClientMoreInfo}/>
            </Stack>
          </Tabs>
        </Scene>

        <Scene hideNavBar panHandlers={null} >
          {/* 파트너 */}
          <Tabs
              key="tabbar2"
              routeName="tabbar2"
              onTabOnPress={() => {
                console.log('Back to and also print this');
              }}
              swipeEnabled
              showLabel={false}
              activeBackgroundColor="#fff"
              inactiveBackgroundColor="#fff"
              tabBarPosition="bottom"
            >
              <Stack key="PartnerMain" hideNavBar iconImg={require("~/Common/Image/partner_footer_icon/tab1.png")} initial icon={TabIcon}
                tabBarOnPress={() => Actions.PartnerHome({type:ActionConst.RESET})}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                <Scene key="PartnerHome" component={PartnerHome} />
              </Stack>

              {/* A/S 매칭 */}
              <Stack key="PartnerAfterService" hideNavBar iconImg={require("~/Common/Image/partner_footer_icon/tab2.png")} icon={TabIcon} 
                tabBarOnPress={() => Actions.PAfterServiceState({type:ActionConst.RESET})}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                <Scene key="PAfterServiceState" component={AfterServiceState} title="A/S 상태 체크"/>
                {/* <Scene key="AfterServiceMatch" component={ListAfterServiceMatch} title="A/S 매칭"/> */}
                {/* <Scene key="ViewAfterServiceMatch" component={ViewAfterServiceMatch} title="A/S 매칭 상세"/> */}
                <Scene key="ViewAfterServiceState" component={ViewAfterServiceState} title="A/S 매칭 후 상태"/>
                <Scene key="RegAfterServiceAdd" component={RegAfterServiceAdd} title="추가 A/S"/>
              </Stack>

              <Stack key="PartnerReport" hideNavBar iconImg={require("~/Common/Image/partner_footer_icon/tab3.png")} icon={TabIcon}
                tabBarOnPress={() => Actions.ListInCompleteReport()}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                {/* <Scene key="ListInCompleteReport" component={ListInCompleteReport} title="미 완료 보고서 리스트"/> */}
                <Scene key="AfterServiceReport" component={AfterServiceReport} title="A/S 보고서"/>
              </Stack>

              <Stack key="PartnerMore" hideNavBar iconImg={require("~/Common/Image/partner_footer_icon/tab4.png")} icon={TabIcon}
                transitionConfig={() => ({screenInterpolator: StackViewStyleInterpolator.forHorizontal})}>
                  <Scene key="PartnerMoreInfo" component={PartnerMoreInfo} />
              </Stack>
            </Tabs>
        </Scene>

      </Drawer>
    </Stack>
  </Router>
);

export default PAGE;

