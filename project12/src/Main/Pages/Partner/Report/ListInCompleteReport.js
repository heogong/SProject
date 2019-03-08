import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, View } from 'react-native'
import { Container, Icon, H3, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceIncomplete from '~/Main/Functions/GetAfterServiceIncomplete';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';

const Product = ({report}) => (
    <TouchableOpacity onPress={ () => Actions.RegAddAfterService({asPrgsId : report.asPrgsId}) }>
      <View style={[styles.listPrdBoxFillWrap, {height: 120}]}>
        <View style={[styles.listPrdBoxImgWrap ,{marginTop: 4}]}>
          <Image 
            source={{uri : report.prdTypeFileUrl}} 
            resizeMode="contain" 
            style={styles.listPrdBoxImg} 
          />
          <Text style={styles.listPrdBoxImgTxt}>{report.prdTypeKoNm}</Text>
        </View>
        <View style={styles.listPrdBoxRightTxtWrap}>
          <H3 style={styles.listPrdBoxRightTitleTxt}>{report.bplaceNm}</H3>
          <Text style={[styles.listPrdBoxDeTxt, styles.mb12, {fontWeight: "500"}]}>{report.asComplteDt}</Text>
          <Text style={styles.listPrdBoxDeTxt}>{report.asItemNm}</Text>
          <View style={styles.fxDirRow}>
            <Text style={[styles.listPrdBoxDeTxt, {paddingTop: 3}]}>만족도</Text>
            <View style={[styles.fxDirRow, {marginLeft: 6}]}>
              <Icon style={styles.listPrdBoxStartIcon} name="star"/>
              <Icon style={styles.listPrdBoxStartIcon} name="star"/>
              <Icon style={styles.listPrdBoxStartIcon} name="star"/>
              <Icon style={styles.listPrdBoxStartIcon} name="ios-star-outline"/>
              <Icon style={styles.listPrdBoxStartIcon} name="ios-star-outline"/>
            </View>
          </View>
        </View>

        <View style={styles.listPrdBoxNextIconWrap}>
          <Icon style={styles.listPrdBoxNextIcon} name="arrow-round-forward"/>
        </View>
      </View>
    </TouchableOpacity>
);


class ListInCompleteReport extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : []
      };
    }

    componentDidMount() {
        this._getAfterServiceIncomplete();
    }

    // 파트너 미작성 보고서 목록 조회
    _getAfterServiceIncomplete = () => {
        GetAfterServiceIncomplete().then(result => {
            GetCommonData(result, this._getAfterServiceIncomplete).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data : resultData.data });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }


    render() {
        return (
            // <CustomBlockWrapper
            //     title="미 작성 보고서 리스트"
            // >
            //     {this.state.data.map((report, idx) => 
            //         <Card key={ idx }>
            //             <CardItem body>
            //                 <Thumbnail large source={{ uri: report.prdTypeFileUrl }} />
            //             </CardItem>
            //             <CardItem>
            //                 <View>
            //                     <Text>
            //                         사업장 : {report.bplaceNm}
            //                     </Text>
            //                     <Text>
            //                         증상 : {report.asItemNm}
            //                     </Text>
            //                     <Text>
            //                         제품 타입 : {report.prdTypeKoNm}
            //                     </Text>
            //                 </View>
            //             </CardItem>
            //             <CardItem>
            //                 <CustomButton onPress={ () => Actions.RegReportBeforePic({asPrgsId : report.asPrgsId}) }>
            //                     <Text>작성</Text>
            //                 </CustomButton>
            //             </CardItem>
            //         </Card>
            //     )}
            // </CustomBlockWrapper>
            <Container style={(this.state.data.length > 0) ? styles.containerScroll : styles.containerInnerPd}>
                <CustomHeader />

                <View style={{marginBottom: 36}}>
                    <View style={styles.fxDirRow}>
                        <View style={stylesReg.leftGuideTxtWrap}>
                        <Text style={stylesReg.leftGuideTxt}>미작성된</Text>
                        <Text style={stylesReg.leftGuideTxt}>보고서작성을</Text>
                        <Text style={stylesReg.leftGuideTxt}>완료해주세요</Text>
                        </View>

                        <View style={stylesReg.rigthTxtWrap}>
                        <Text style={[stylesReg.rightTxt, {fontWeight: "bold"}]}>
                            04<Text style={stylesReg.rightTxtSmall}>건</Text>
                        </Text>
                        </View>
                    </View>
                </View>

                { (this.state.data.length > 0) ?
                (
                     <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.data.map((report, idx) =>
                            <Product
                                key={idx}
                                report={ report }
                            />
                        )}
                    </ScrollView>
                ) : (
                    <View style={styles.listPrdBoxEmptyImgWrap}>
                        <Image 
                            source={require("~/Common/Image/license-depart01.png")} 
                            style={{height: 219, width: 219, marginTop: -36}} 
                        />
                    </View>

                )}
            </Container>
        )
    }
}

export default ListInCompleteReport;