/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import transform from "css-to-react-native-transform";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
}

componentWillMount() {
  const aa = transform(`
  @charset "utf-8";
* {margin:0;padding:0;} 
html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,
del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,article,aside,canvas,details,figcaption,figure,main,
footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video {border:0;outline:0;background:transparent;font-size:100%;}
table,caption,tbody,tfoot,thead,tr,th,td {outline:0;background:transparent;font-size:100%;}
article,aside,canvas,details,figcaption,figure,main,footer,header,hgroup,menu,nav,section,summary {display:block;}
nav, ul {list-style:none;}
blockquote,q {quotes:none;}
blockquote:before,blockquote:after,
q:before,q:after {content:"";content:none;}

a {margin:0;padding:0;border:0;font-size:100%;}
ins {color:#000;text-decoration:none;}
mark {color:#000;font-style:italic;font-weight:700;}
del,s {text-decoration:line-through;}
abbr[title],dfn[title] {border-bottom:1px dotted #000;cursor:help;}

hr {display:block;height:1px;border:0;border-top:1px solid #cccccc;margin:1em 0;padding:0;}
input,select {}
th,td {}

body {font-size:14px;color:#555;line-height:150%;}
select,input,button,textarea,button{font-family:'Roboto','Noto Sans KR','Apple SD Gothic Neo', "Malgun Gothic";font-weight:400;}
input, textarea, button {-webkit-appearance:none; -moz-appearance:none; appearance:none; -webkit-border-radius: 0;}
input, textarea, button, select {-webkit-border-radius:0; -moz-border-radius:0; -o-border-radius:0; border-radius:0;}

table{font-size:inherit;font:100%;}
pre,code,kbd,samp,tt{font-family:monospace;*font-size:108%;line-height:100%;}

address {font-style:normal;display:inline;}

/* 글자 속성 */
a{color:#555;text-decoration:none;}
a:active {}
a:focus {}


/* LIST 요소 기본 */
li {list-style:none;}
ul.fllist li , .fllist > * {float:left;}
ul.frlist li , .frlist > * {float:right;}
.fllist:after , .frlist:after {clear:both;display:block;content:"";}
ol.onum li, .onum li {list-style-type:decimal}
.onum {padding-left:22px}


/* 이미지 요소 기본 */
img {border:0px;vertical-align:middle;} 
img.button {cursor:pointer;}
button.imgBtn {padding:0px;margin:0px;border:0px;cursor:pointer;}


table { border-collapse: collapse; border-spacing: 0px; width:100%}
table.ashow {empty-cells:show;}



/*플로팅*/
.fr {float:right;}
.fl {float:left;}
.cr {clear:both;}
.aftercr:after {clear:both;content:"";display:block;}


/*포지셔닝*/
.pos_d, .pos-d, .pos-st {position:static;} /*기본*/
.pos_r,.pos-r, .pos-rel {position:relative;}
.pos_a,.pos-a, .pos-abs {position:absolute;}


/*박스유형*/
.isbox, .is-rel, .is-box {display:block;position:relative;}
.isabs, .is-abs {position:absolute;}
.inline {display:inline-block;}

/* 글자자름 (inline-block, block 형태로 가로폭 반드시 지정해 줘야함)*/
.ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;   }
.wordkeep {white-space:normal;word-break:keep-all;   }


/*숨김*/
.hidden {display:none;}
.blind {width:1px;height:1px;overflow:hidden;position:absolute;top:-9999em;left:-9999em;display:block;text-indent:-9999em;font-size:0px;line-height:0;}


/*공백 */
.gap10 {height:10px;clear:both;overflow:hidden;display:block;}
.gap20 {height:20px;clear:both;overflow:hidden;display:block;}
.gap30 {height:30px;clear:both;overflow:hidden;display:block;}
.gap40 {height:40px;clear:both;overflow:hidden;display:block;}
.gap50 {height:50px;clear:both;overflow:hidden;display:block;}
.gap60 {height:60px;clear:both;overflow:hidden;display:block;}
.gap100 {height:100px;clear:both;overflow:hidden;display:block;}


.gap {height:50px;clear:both;display:block;}
.sgap {height:30px;clear:both;display:block;}
.ssgap {height:15px;clear:both;display:block;}
.sssgap {height:10px;clear:both;display:block;}
	@media only screen and  (max-width:780px) {
		.gap {height:30px;}
		.sgap {height:20px;}
		.ssgap {height:15px;}
		.sssgap {height:10px;}

		.gap10 {height:10px;}
		.gap20 {height:15px;}
		.gap30 {height:20px;}
		.gap40 {height:25px;}
	}	



/*정렬*/
.tc {text-align:center;}
.tl {text-align:left;}
.tr {text-align:right;}
.left ,.l {text-align:left !important;}
.right,.r {text-align:right !important;}
.center, .c {text-align:center !important;}
.vtop,.vtop  * {vertical-align:text-top !important;}
.vcen,.vcen  * {vertical-align:middle !important;}
.vfoot,.vfoot  * {vertical-align:text-bottom !important;}
.vtop2 {vertical-align:top !important;}
.vcen2 {vertical-align:middle !important;}
.vfoot2 {vertical-align:bottom !important;}


/* 들여쓰기 */
.indent {margin-left:23px;}
ul.indent {margin-left:16px;}
.li-indent {margin-left:10px;}


/* 폰트색상 */
.c0  {color:#000 !important;}
.c2  {color:#222 !important;}
.c3  {color:#333 !important;}
.c5  {color:#555 !important;}
.c6  {color:#666 !important;}
.c8  {color:#888 !important;}
.c9  {color:#999 !important;}
.cf  {color:#fff !important;}

/*색조*/
.cg1 {color:#69696a !important;}
.cg2 {color:#ababab !important;}
.cg3 {color:#848484 !important;}
.cg4 {color:#727272 !important;}
.cg5 {color:#b3b7bc !important;}

.cblack{color:#333 !important}
.cred {color:#c62828 !important;}
.cblue {color:#004986 !important;}
.cblue1 {color:#4e70a5 !important;}
.cpink {color:#ef2965 !important}
.cgold {color:#c09537 !important;}
.cgreen {color:#3b743f !important;}
.cbrown {color:#9F2C00 !important;}
.corg {color:#ff5612 !important;}
.cblack {color:#333 !important;}
.corange{color:#fa6604 !important;}
.ccyan{color:#00907e !important;}
.cviolet{color:#7a72f4 !important;}
.cyellow{color:#f4cb01 !Important;}


.bgray {background-color:#EAEAEA;border:1px solid #7F9DB9;}

/* 폰트속성 */
.nb {font-weight:normal;}
.b {font-weight:bold;}

.fs {font-size:90%}
.fb {font-size:120%;}

.f9 {font-size:9px;}
.f10 {font-size:10px;}
.f11 {font-size:11px;}
.f12 {font-size:12px;}
.f13 {font-size:13px;}
.f14 {font-size:14px;}
.f15 {font-size:15px;}
.f16 {font-size:16px;}
.f17 {font-size:17px;}
.f18 {font-size:18px;}
.f20 {font-size:20px;}

/*도움말 공통*/
.fhelp{font-size:11px;letter-spacing:-1px;color:#6381aa;line-height:130%;}

/*줄간격*/
.tlh190 {line-height:190%;}
.tlh180 {line-height:180%;}
.tlh170 {line-height:170%;}
.tlh160 {line-height:160%;}
.tlh150 {line-height:150%;}
.tlh140 {line-height:140%;}
.tlh130 {line-height:130%;}
.tlh120 {line-height:120%;}
.tlh110 {line-height:110%;}

/*영문,숫자*/
.en {font-size:90%;font-family:Verdana;}

/*회색필터처리*/
.gray { filter: Gray; }


/* 패딩 5,10단위만 지정함*/
.pad5a {padding:5px}
.pad5tf {padding-top:5px;padding-bottom:5px}
.pad5lr {padding-left:5px;padding-right:5px;}
.pad5r {padding-right:5px}
.pad5l {padding-left:5px}
.pad5t {padding-top:5px}
.pad5f {padding-bottom:5px}
.pad10a {padding:10px}
.pad10tf {padding-top:10px;padding-bottom:10px}
.pad10lr {padding-left:10px;padding-right:10px;}
.pad10r {padding-right:10px}
.pad10l {padding-left:10px}
.pad10t {padding-top:10px}
.pad10f {padding-bottom:10px}
.pad15a {padding:15px}
.pad15tf {padding-top:15px;padding-bottom:15px}
.pad15lr {padding-left:15px;padding-right:15px;}
.pad15r {padding-right:15px}
.pad15l {padding-left:15px}
.pad15t {padding-top:15px}
.pad15f {padding-bottom:15px}
.pad20a {padding:20px}
.pad20tf {padding-top:20px;padding-bottom:20px}
.pad20lr {padding-left:20px;padding-right:20px;}
.pad20r {padding-right:20px}
.pad20l {padding-left:20px}
.pad20t {padding-top:20px}
.pad20f {padding-bottom:20px}
.pad25a {padding:25px}
.pad25tf {padding-top:25px;padding-bottom:25px}
.pad25lr {padding-left:25px;padding-right:25px;}
.pad25r {padding-right:25px}
.pad25l {padding-left:25px}
.pad25t {padding-top:25px}
.pad25f {padding-bottom:25px}
.pad30a {padding:30px}
.pad30tf {padding-top:30px;padding-bottom:30px}
.pad30lr {padding-left:30px;padding-right:30px;}
.pad30r {padding-right:30px}
.pad30l {padding-left:30px}
.pad30t {padding-top:30px}
.pad30f {padding-bottom:30px}
.pad40a {padding:40px}
.pad40tf {padding-top:40px;padding-bottom:40px}
.pad40lr {padding-left:40px;padding-right:40px;}
.pad40r {padding-right:40px}
.pad40l {padding-left:40px}
.pad40t {padding-top:40px}
.pad40f {padding-bottom:40px}
.pad50a {padding:50px}
.pad50tf {padding-top:50px;padding-bottom:50px}
.pad50lr {padding-left:50px;padding-right:50px;}
.pad50r {padding-right:50px}
.pad50l {padding-left:50px}
.pad50t {padding-top:50px}
.pad50f {padding-bottom:50px}



/*마진*/
.noMgf, .no_mgf {margin-bottom:0px !important;}
.mg5f {margin-bottom:5px;}
.mg10f {margin-bottom:10px;}
.mg15f {margin-bottom:15px;}
.mg20f {margin-bottom:20px;}
.mg25f {margin-bottom:25px;}
.mg30f {margin-bottom:30px;}
.mg40f {margin-bottom:40px;}
.mg50f {margin-bottom:50px;}
.mg60f {margin-bottom:60px;}
.mg5t {margin-top:5px;}
.mg10t {margin-top:10px;}
.mg15t {margin-top:15px;}
.mg20t {margin-top:20px;}
.mg25t {margin-top:25px;}
.mg30t {margin-top:30px;}
.mg35t {margin-top:35px;}
.mg40t {margin-top:40px;}
.mg50t {margin-top:50px;}
.mg60t {margin-top:60px;}
.mg10b {margin-bottom:10px;}
.mg15b {margin-bottom:15px;}
.mg5 {margin-left:5px;}
.mg10 {margin-left:10px;}
.mg15 {margin-left:15px;}
.mg20 {margin-left:20px;}
.mg25 {margin-left:25px;}
.mg30 {margin-left:30px;}
.mg40 {margin-left:40px;}
.mg50 {margin-left:50px;}
.mg60 {margin-left:60px;}
.mg5r {margin-right:5px;}
.mg0r {margin-right:0px !important;}
.mg10r {margin-right:10px;}
.mg15r {margin-right:15px;}
.mg20r {margin-right:20px;}
.mg25r {margin-right:25px;}
.mg30r {margin-right:30px;}
.mg40r {margin-right:40px;}
.mg50r {margin-right:50px;}
.mg60r {margin-right:60px;}
.mg5a {margin:5px;}
.mg10a {margin:10px;}
.mg15a {margin:15px;}
.mg20a {margin:20px;}
.mg25a {margin:25px;}
.mg30a {margin:30px;}
.mg10tf {margin-top:10px;margin-bottom:10px}
.mg20tf {margin-top:20px;margin-bottom:20px}
.mg50tf {margin-top:50px;margin-bottom:50px}
.mg50lr {margin-left:50px;margin-right:50px;}

/*가로 크기*/
.w500 {width:500px;}
.w250 {width:250px;}
.w150 {width:150px;}
.w130 {width:130px;}
.w110 {width:110px;}
.w100 {width:100px;}
.w200 {width:200px;}
.w90 {width:90px;}
.w80 {width:80px;}
.w70 {width:70px;}
.w60 {width:60px;}
.w50 {width:50px;}
.w40 {width:40px;}
.w30 {width:30px;}
.w20 {width:20px;}
.w10{width:10px;}


.w100p {width:100%;}
.w99p {width:99%;}
.w98p {width:98%;}
.w90p {width:90%;}
.w80p {width:80%;}
.w70p {width:70%;}
.w65p {width:65%;}
.w60p {width:60%;}
.w50p {width:49%;}
.w48p {width:48%;}
.w45p {width:44%;}
.w40p {width:40%;}
.w35p {width:35%;}
.w33p {width:33.3333%;}
.w30p {width:30%;}
.w29p {width:29%;}
.w28p {width:28%;}
.w27p {width:27%;}
.w25p {width:25%;}
.w20p{width:20%;}
.w19p{width:19%;}
.w18p{width:18%;}
.w17p{width:17%;}
.w15p{width:15%;}
.w10p{width:10%;}
.w5p {width:5%;}

/* 애니메이션 속도*/
.animate-speed{-webkit-transition: all 0.3s ease-out;-moz-transition: all 0.3s ease-out;-o-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}


/*마우스오버 손모양*/
label{cursor:pointer}
button{cursor:pointer;}
`
,{ parseMediaQueries: true }
  );

console.log(aa);

}

  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
