import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Card,
  CardItem,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Picker,
  Body,
  Text,
  Textarea,
  Thumbnail,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class TermsContent1 extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={[styles.header, styles.noPadding, {paddingLeft: 26, paddingRight: 26}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>이용약관</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={{flex: 1, backgroundColor: "#d6f1ff", paddingLeft: 26, paddingRight: 26}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, marginBottom: 20}}>
              <Text style={localStyles.titleTxt}>서비스 이용약관</Text>

              <Text style={localStyles.titleTxt1}>제1장 총칙</Text>
              
              <Text style={localStyles.titleTxt2}>제1조 [목적]</Text>
              <Text style={localStyles.txt}>이 약관은 ㈜프리즈(가) 온라인으로 제공하는 디지털콘텐츠(이하 “콘텐츠”라고 한다) 및 제반서비스의 이용과 관련하여 쿨리닉와(과) 이용자와의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</Text>

              <Text style={localStyles.titleTxt2}>제2조 [정의]</Text>
              <Text style={localStyles.txt}>
                이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                1. “쿨리닉”(이)라 함은 “콘텐츠” 산업과 관련된 경제활동을 영위하는 자로서 콘텐츠 및 제반서비스를 제공하는 자를 말합니다.
                2. “이용자”라 함은 “쿨리닉”의 사이트에 접속하여 이 약관에 따라 “쿨리닉”이(가) 제공하는 “콘텐츠” 및 제반서비스를 이용하는 회원 및 비회원을 말합니다.
                3. “회원”이라 함은 “쿨리닉”와(과) 이용계약을 체결하고 “이용자” 아이디(ID)를 부여받은 “이용자”로서 “쿨리닉”의 정보를 지속적으로 제공받으며 “쿨리닉”이(가) 제공하는 서비스를 지속적으로 이용할 수 있는 자를 말합니다.
                4. “비회원”이라 함은 “회원”이 아니면서 “쿨리닉”이(가) 제공하는 서비스를 이용하는 자를 말합니다.
                5. “콘텐츠”라 함은 정보통신망이용촉진 및 정보보호 등에 관한 법률 제2조 제1항 제1호의 규정에 의한 정보통신망에서 사용되는 부호·문자·음성·음향·이미지 또는 영상 등으로 표현된 자료 또는 정보로서, 그 보존 및 이용에 있어서 효용을 높일 수 있도록 전자적 형태로 제작 또는 처리된 것을 말합니다.
                6. “아이디(ID)”라 함은 “회원”의 식별과 서비스이용을 위하여 “회원”이 정하고 “인테리어할 땐 집닥”이(가) 승인하는 문자 또는 숫자의 조합을 말합니다.
                7. “비밀번호(PASSWORD)”라 함은 “회원”이 부여받은 “아이디”와 일치되는 “회원”임을 확인하고 비밀보호를 위해 “회원” 자신이 정한 문자 또는 숫자의 조합을 말합니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제3조 [신원정보 등의 제공]</Text>
              <Text style={localStyles.txt}>“쿨리닉”은(는) 이 약관의 내용, 상호, 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호 및 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 온라인 서비스초기화면에 게시합니다. 다만, 약관은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.</Text>

              <Text style={localStyles.titleTxt2}>제4조 [약관의 게시 등]</Text>
              <Text style={localStyles.txt}>
                ① “쿨리닉”은(는) 이 약관을 “회원”이 그 전부를 인쇄할 수 있고 거래과정에서 해당 약관의 내용을 확인할 수 있도록 기술적 조치를 취합니다.
                ② “쿨리닉”은(는) “이용자”가 “쿨리닉”와(과) 이 약관의 내용에 관하여 질의 및 응답할 수 있도록 기술적 장치를 설치합니다.
                ③ “쿨리닉”은(는) “이용자”가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 환불조건 등과 같은 중요한 내용을 이용자가 쉽게 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 “이용자”의 확인을 구합니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제5조 [약관의 개정 등]</Text>
              <Text style={localStyles.txt}>
                ① “쿨리닉”은(는) 온라인 디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                ② “쿨리닉”이(가) 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스초기화면에 그 적용일자 7일 이전부터 적용일 후 상당한 기간동안 공지하고, 기존회원에게는 개정약관을 전자우편주소로 전송합니다.
                ③ “쿨리닉”이(가) 약관을 개정할 경우에는 개정약관 공지 후 개정약관의 적용에 대한 “이용자”의 동의 여부를 확인합니다. “이용자”가 개정약관의 적용에 동의하지 않는 경우 “쿨리닉” 또는 “이용자”는 콘텐츠 이용계약을 해지할 수 있습니다. 이때, “쿨리닉”은(는) 계약해지로 인하여 “이용자”가 입은 손해를 배상합니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제6조 [약관의 해석]</Text>
              <Text style={localStyles.txt}>이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 온라인 디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 정보통신부장관이 정하는 디지털콘텐츠이용자보호지침, 기타 관계법령 또는 상관례에 따릅니다.</Text>

              <Text style={localStyles.titleTxt1}>제2장 회원가입</Text>

              <Text style={localStyles.titleTxt2}>제7조 [회원가입]</Text>
              <Text style={localStyles.txt}>
                ① 회원가입은 “이용자”가 약관의 내용에 대하여 동의를 하고 회원가입신청을 한 후 “쿨리닉”이(가) 이러한 신청에 대하여 승낙함으로써 체결됩니다.
                ② 회원가입신청서에는 다음 사항을 기재해야 합니다. 1호 내지 3호의 사항은 필수사항이며, 그 외의 사항은 선택사항입니다.
                1. “회원”의 성명 또는 인터넷상 개인식별번호 
                2. “아이디”와 “비밀번호” 
                3. 전자우편주소 
                4. 이용하려는 “콘텐츠”의 종류 
                5. 기타 “쿨리닉”이(가) 필요하다고 인정하는 사항
                ③ “쿨리닉”은(는) 상기 “이용자”의 신청에 대하여 회원가입을 승낙함을 원칙으로 합니다. 다만, “쿨리닉”은(는) 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않을 수 있습니다.
                1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우 
                2. 실명이 아니거나 타인의 명의를 이용한 경우 
                3. 허위의 정보를 기재하거나, 인테리어할 땐 집닥이(가) 제시하는 내용을 기재하지 않은 경우 
                4. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
                ④ “쿨리닉”은(는) 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
                ⑤ 제3항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, “쿨리닉”은(는) 이를 신청자에게 알려야 합니다. “쿨리닉”의 귀책사유 없이 신청자에게 통지할 수 없는 경우에는 예외로 합니다.
                ⑥ 회원가입계약의 성립 시기는 “쿨리닉”의 승낙이 “이용자”에게 도달한 시점으로 합니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제8조 [미성년자의 회원가입에 관한 특칙]</Text>
              <Text style={localStyles.txt}>
                ① 만 14세 미만의 “이용자”는 개인정보의 수집 및 이용목적에 대하여 충분히 숙지하고 부모 등 법정대리인의 동의를 얻은 후에 회원가입을 신청하고 본인의 개인정보를 제공하여야 합니다.
                ② 쿨리닉은(는) 부모 등 법정대리인의 동의에 대한 확인절차를 거치지 않은 14세 미만 이용자에 대하여는 가입을 취소 또는 불허합니다.
                ③ 만 14세 미만 “이용자”의 부모 등 법정대리인은 아동에 대한 개인정보의 열람, 정정, 갱신을 요청하거나 회원가입에 대한 동의를 철회할 수 있으며, 이러한 경우에 “쿨리닉”은(는) 지체 없이 필요한 조치를 취해야 합니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제9조 [회원정보의 변경]</Text>
              <Text style={localStyles.txt}>
                ① “회원”은 개인정보관리화면을 통하여 언제든지 자신의 개인정보를 열람하고 수정할 수 있습니다.
                ② “회원”은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 “쿨리닉”에 대하여 그 변경사항을 알려야 합니다.
                ③ 제2항의 변경사항을 “쿨리닉”에 알리지 않아 발생한 불이익에 대하여 “쿨리닉”은(는) 책임지지 않습니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제10조 [“회원”의 “아이디” 및 “비밀번호”의 관리에 대한 의무]</Text>
              <Text style={localStyles.txt}>
                ① “회원”의 “아이디”와 “비밀번호”에 관한 관리책임은 “회원”에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
                ② “회원”은 “아이디” 및 “비밀번호”가 도용되거나 제3자에 의해 사용되고 있음을 인지한 경우에는 이를 즉시 “쿨리닉”에 통지하고 “쿨리닉”의 안내에 따라야 합니다.
                ③ 제2항의 경우에 해당 “회원”이 “쿨리닉”에 그 사실을 통지하지 않거나, 통지한 경우에도 “쿨리닉”의 안내에 따르지 않아 발생한 불이익에 대하여 “쿨리닉”은(는) 책임지지 않습니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제11조 [“회원”에 대한 통지]</Text>
              <Text style={localStyles.txt}>
                ① “쿨리닉”이(가) “회원”에 대한 통지를 하는 경우 “회원”이 지정한 전자우편주소로 할 수 있습니다.
                ② “쿨리닉”은(는) “회원” 전체에 대한 통지의 경우 7일 이상 “쿨리닉”의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, “회원” 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 제1항의 통지를 합니다.
              </Text>

              <Text style={localStyles.titleTxt2}>제12조 [회원탈퇴 및 자격 상실 등]</Text>
              <Text style={localStyles.txt}>
                ① “회원”은 “쿨리닉”에 언제든지 탈퇴를 요청할 수 있으며 “쿨리닉”은(는) 즉시 회원탈퇴를 처리합니다.
                ② “회원”이 다음 각호의 사유에 해당하는 경우, “쿨리닉”은(는) 회원자격을 제한 및 정지시킬 수 있습니다.
                1. 가입신청 시에 허위내용을 등록한 경우 
                2. “쿨리닉”의 서비스이용대금, 기타 “쿨리닉”의 서비스이용에 관련하여 회원이 부담하는 채무를 기일에 이행하지 않는 경우 
                3. 다른 사람의 “쿨리닉”의 서비스이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우 
                4. “쿨리닉”을(를) 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
                ③ “쿨리닉”이(가) 회원자격을 제한·정지시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우
                “쿨리닉”은(는) 회원자격을 상실시킬 수 있습니다.
                ④ “쿨리닉”이(가) 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 “회원”에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.
              </Text>

            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  listMenuWrap: {
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 48,
    width: "100%",
    paddingLeft: 26
  },
  listMenuTxt: {
    fontSize: 16,
    color: "#8e8e98"
  },
  titleTxt: {
    fontSize: 18,
    color: "#000000",
    paddingTop: 43,
    paddingBottom: 13,
    fontWeight: "bold"
  },
  titleTxt1: {
    fontSize: 14,
    color: "#626270",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10
  },
  titleTxt2: {
    fontSize: 12,
    color: "#626270",
    paddingTop: 10,
    paddingBottom: 10
  },
  txt: {
    fontSize: 11,
    color: "#626270",
  }
});

export default TermsContent1;