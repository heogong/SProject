import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Button,
  Text,
  Item,
  Input,
} from "native-base";


const InvaildPasswd = (props) => {
  return (
    (props.status == 0) ? (
      <View style={[styles.pd20, {flex :1, paddingTop : 35, backgroundColor : '#28c8f5'}] }>
        <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
          <Input 
            style={{fontSize : 12}}
            placeholder="이메일 아이디" 
          />
        </Item>
        <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
          <Input 
            style={{fontSize : 12}}
            placeholder="이름" 
          />
        </Item>
        <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
          <Input 
            style={{fontSize : 12}}
            placeholder="핸드폰번호(하이픈 -제외하고 입력)" 
          />
        </Item>
        
        <View style={{flexDirection : 'row'}}>
          <View style={{width : '60%', paddingRight : 10}}>
            <Item regular style={{backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}}>
              <Input 
                style={{fontSize : 12}}
                placeholder="인증번호입력" />
            </Item>
          </View>
          <View style={{width: '40%'}}>
            <Button block info 
              onPress={ () => alert("인증번호전송")}
              style={{
                height : inputHeight,
                borderColor : '#fff',
                borderTopWidth : 1,
                borderBottomWidth : 1,
                borderLeftWidth : 1,
                borderRightWidth : 1, 
                elevation:0
              }} >
              <Text style={{fontSize : 12}}>인증번호전송</Text>
            </Button>
          </View>
        </View>
        
        <View>
          <Text style={styles.whiteFont}>유효한 인증번호입니다.</Text>
        </View>
      </View>

    ) : (
      (props.status == 1) ? (
        <View style={[styles.pd20, {flex :1, paddingTop : 35, backgroundColor : '#28c8f5'}] }>

          <View style={{flex : 1, backgroundColor : '#28c8f5', justifyContent : 'center', alignItems : 'center'}}>
            <Text style={styles.whiteFont}>박정진님은 가입되어 있으며</Text>
            <Text style={styles.whiteFont}>회원님의 아이디는 어쩌구젖구</Text>
            <Text style={styles.whiteFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
          </View>
          
          <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
            <Input 
              style={{fontSize : 12}}
              placeholder="비밀번호(영문+숫자+특수문자조합8-16자리)"
            />
          </Item>
          <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
            <Input 
              style={{fontSize : 12}}
              placeholder="비밀번호확인" 
            />
          </Item>
        </View>

      ) : (
        <View style={[styles.pd20, {flex :1, paddingTop : 35, backgroundColor : '#28c8f5'}] }>
          <View style={{flex : 1, backgroundColor : '#28c8f5', justifyContent : 'center', alignItems : 'center'}}>
            <Text style={styles.whiteFont}>박정진님은 가입되어 있으며</Text>
            <Text style={styles.whiteFont}>회원님의 아이디는 어쩌구젖구</Text>
            <Text style={styles.whiteFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
          </View>
        </View>
      )
      
    )
  );
}

const layoutCount = 5; // 화면 분할 개수 사이즈
const viewportHeight = Dimensions.get('window').height;

const inputHeight = (viewportHeight / layoutCount) * 0.3;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content : {
    marginLeft : 10,
    marginRight : 10
  },
  mb10: {
    marginBottom: 10
  },
  mb15: {
    marginBottom: 15
  },
  mb20: {
    marginBottom: 20
  },
  mg5 : {
    marginTop : 5,
    marginBottom : 5,
    marginLeft : 5,
    marginRight : 5
  },
  mg10 : {
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 10,
    marginRight : 10
  },
  pd10 : {
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft : 10,
    paddingRight : 10
  },
  pd20 : {
    paddingTop : 20,
    paddingBottom : 20,
    paddingLeft : 20,
    paddingRight : 20
  },
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  },
  whiteFont : {
    color : '#FFF',
    fontSize : 15
  },
});
export default InvaildPasswd;