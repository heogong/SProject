import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, View, scrollToEnd } from 'react-native';
import { Item, Input, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import EditProductMst from '~/Main/Functions/EditProductMst';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ProductImage from '~/Main/Components/ProductImage';

import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


export const CameraCard = () => (
    <View style={[styles.pd10, styles.mb10, {width : cameraSize, height : cameraSize, backgroundColor : color.whiteColor}]}>
      <View style={styles.fx1} />
          <View style={[styles.fx1, {alignItems : 'center', justifyContent:'center'}]}>
              <TouchableOpacity onPress={ () => alert("사진 촬영")}>
                <Image source={require("~/Common/Image/ico-camera.png")} resizeMode="center"/>
              </TouchableOpacity>
          </View>
      <View style={styles.fx1} />
    </View>
);

export const ImgCard = () => (
    <View style={[styles.mg5, {width : cameraSize, height : cameraSize}]}>
      <View>
        <ImageBackground 
          style={{width: '100%', height: '100%'}}
          source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}
        >
          <View style={[styles.pd10, styles.fx2]}>
            <TouchableOpacity onPress={ () => alert("사진 삭제")}>
              <Image source={require("./img/check-on2.png")} />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity 
            style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter, {backgroundColor : 'rgba(40, 200, 245, 0.6)'}]}
            onPress={ () => alert("재등록하기")}>
            <View>
              <Text style={[styles.whiteFont, {fontWeight : '500'}]}>재등록하기</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        
      </View>
    </View>
  );

class ProductShowCase extends Component {
    constructor(props) { 
        super(); 

        this.state = {
            setProductName : false, // 제품명 입력 여부
            productName : ''
        };
    }

    static defaultProps = {
        copyBtn : true, // 복사버튼 사용 여부
        viewProduct : false // 단순 조회 여부
    }

    componentDidMount() {
        if(this.props.clientPrdNm !== null) {
            this.setState({ setProductName : true});
        } else {
            this.setState({ setProductName : false});
        }
    }

     // 제품명 입력 여부
    _setProductNm = (text)  => {
        this.setState({productName : text});

        if(text.length > 0) {
            this.setState({ setProductName : true});
        } else{
            this.setState({ setProductName : false});
        }

    }

    // 제품명 업데이트
    _submitProductNm = () => {
        EditProductMst(this.props.clientPrdId, this.state.productName).then(result => {
            GetCommonData(result, this._submitProductNm).then(async resultData => {
                if(resultData !== undefined) {
                    console.log("GetProdImageType : ",resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(!ResultBool) {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            // <Card key={this.props.index}>
            //     <CardItem>
            //         <Thumbnail large source={{ uri: this.props.defaultImg }} />
            //         {(this.props.index !== 0) ? 
            //             <Button onPress={ this.props.handleRemoveShowCase(this.props.index) }>
            //                 <Text>삭제</Text>
            //             </Button>
            //         :
            //             <View></View>
            //         }
            //     </CardItem>
            //     <CardItem>
            //         {(this.props.viewProduct) ? (
            //             <Item>
            //                 <Input
            //                     value={ this.props.productName }
            //                     disabled={ true }
            //                 >
            //                     {this.props.clientPrdNm}
            //                 </Input>
            //             </Item>

            //         ):(
            //             <Item error success={ this.state.setProductName }>
            //                 <Input
            //                     value={ this.props.productName }
            //                     placeholder='제품명을 입력하세요.'
            //                     onChangeText={(text) => this._setProductNm(text) }
            //                     onBlur={this._submitProductNm}
            //                     // autoFocus={ true }
            //                 >
            //                     {this.props.clientPrdNm}
            //                 </Input>
            //                 {(this.state.setProductName) ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' />}
            //             </Item>
            //         )}
            //     </CardItem>
            //     <CardItem cardBody>
            //         <View style={{ flex:1, justifyContent: 'center'}}>
            //             <View style={ styles.boxLayout }>
            //                 {this.props.data.map((info, idx) => (
            //                     <ProductImage 
            //                         prdTypeImgCateNm={ info.prdTypeImgCateNm }
            //                         clientPrdId={ this.props.clientPrdId }
            //                         clientPrdImgId={ info.clientPrdImgId }
            //                         prdImgCateId={ info.prdTypeImgCateId }
            //                         uri={ (info.fileUrl !== null) ? info.fileUrl : this.props.defaultImg }
            //                         defaultImg={ this.props.defaultImg }
            //                         imageTouch={ (info.fileUrl !== null) ? false : true }
            //                         index={ idx }
            //                         viewProduct={ this.props.viewProduct }
            //                     />
            //                 ))}

            //             </View>
            //         </View>
            //     </CardItem>
            //     {(this.props.copyBtn) ? (
            //         <Button onPress={ this.props.handleCopyShowCase(this.props.index) }>
            //             <Text>복제</Text>
            //         </Button>
            //     ) : (
            //         <View></View>
            //     )
            //     }
                
            // </Card>

            <View style={[styles.pd10, {backgroundColor : color.defaultBackColor}]}>
                <View style={[styles.mb10, styles.fxDirRow]}>
                    <View style={styles.fx1}>
                        
                        <View style={styles.fx1}>
                            <TouchableOpacity onPress={this.props.handleRemoveShowCase(this.props.index)}>
                                <Image source={require("~/Common/Image/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fx2} />
                    </View>
    
                    <View style={[styles.fx3, styles.justiConCenter, styles.alignItemsCenter]}>
                        <H2 style={[styles.mb5, {color:color.whiteColor}]}>01</H2>
                        <Image source={require("~/Common/Image/license-depart01.png")} style={{height : imageSize, width : imageSize}} />
                    </View>
    
                    <View style={styles.fx1}>
                        <View style={[styles.fx1, styles.alignItemsEnd]}>

                            <TouchableOpacity onPress={this.props.handleAddShowCase} style={styles.mb10}>
                                <Image source={require("~/Common/Image/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                            </TouchableOpacity>

                            
                            <TouchableOpacity onPress={this.props.handleCopyShowCase(this.props.index)}>
                                <Image source={require("~/Common/Image/join-end.png")} style={{height : buttonSize1, width : buttonSize1}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fx2} />
                    </View>
                </View>
    
                <View style={[styles.mb10, {alignItems : 'center'}]}>
                    <Text style={[styles.mb5, styles.whiteFont]}>제품 이름을 입력하세요</Text>
                    <Item regular style={[styles.mb5, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 30}]}>
                        <Input 
                            style={{fontSize : 12}}
                            placeholder="제품이름" 
                            placeholderTextColor={color.deepGreyColor}
                            />
                    </Item>
                    <Text style={[styles.mb5, styles.whiteFont]}>제품의 간략한 설명을 입력하세요</Text>
                    <Item regular style={[styles.mb5, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 30}]}>
                        <Input 
                            style={{fontSize : 12}}
                            placeholder="제품설명" 
                            placeholderTextColor={color.deepGreyColor}
                        />
                    </Item>
                </View>
    
                <View style={{alignItems : 'center'}}>
                    <Text style={styles.whiteFont}>촬영가이드에 따라 제품의 사진을 찍어주세요</Text>
    
                    <View style={[styles.fx1, {justifyContent : 'center'}]}>
                        <View style={[styles.fxDirRow, styles.justiConBetween, {flexWrap : 'wrap'}]}>

                        {
                            item.imgTypeArray.map((showCase, idx) => (
                                <CameraCard/>
                            ))
                        }
                            
                        </View>
                    </View>
                </View>
            </View>


        );
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}
  
const imageSize = wp(35, 0);
const buttonSize1 = wp(8, 0);

// 사진 촬영박스 사이즈
const cameraSize = (45 * itemWidth) / 100;

export default ProductShowCase;