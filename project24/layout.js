import transform from "css-to-react-native-transform";

export const layout = transform(`
@charset "utf-8";
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
@font-face { 
  font-family: 'Noto Sans KR'; 
  font-style: normal; 
  font-weight: 100; 
  src: url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2) format('woff2'), 
      url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff) format('woff'), 
      url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf) format('opentype'); 
} 
@font-face { 
  font-family: 'Noto Sans KR'; 
  font-style: normal; 
  font-weight: 300; 
  src: url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2) format('woff2'), 
      url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff) format('woff'), 
      url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf) format('opentype'); 
} 
@font-face { 
  font-family: 'Noto Sans KR'; 
  font-style: normal; 
  font-weight: 400; 
  src: url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype'); 
 } 
@font-face { 
  font-family: 'Noto Sans KR'; 
  font-style: normal; 
  font-weight: 500; 
  src: url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype'); 
 } 
@font-face { 
  font-family: 'Noto Sans KR'; 
  font-style: normal; 
  font-weight: 700; 
  src: url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype'); 
 } 
@font-face { 
  font-family: 'Noto Sans KR'; 
  font-style: normal; 
  font-weight: 900; 
  src: url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2) format('woff2'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff) format('woff'), 
        url(https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf) format('opentype'); 
 }
   
html,body {width:100%; font-family:'Roboto','Noto Sans KR','Apple SD Gothic Neo', "Malgun Gothic";font-weight:400;  }
body {overflow-y:visible;overflow-x:hidden;}
.doc {position:relative;min-width:320px; overflow:hidden;-webkit-transition: all 0.3s ease-out;-moz-transition: all 0.3s ease-out;-o-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}
body.main{background:#f0f0f0}

/*=======================================================
  default css 
=========================================================*/
.div-cont {position:relative;text-align:left;margin:0 auto 0 auto; }
.div-cont:after {clear:both;content:"";display:block;}

.body-slide-wr {position:relative;width:100%;transition:margin 0.3s ease;}
.layer-slider-ovclick{position:fixed;z-index:2600;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,0.65);cursor:pointer }
.header-slider-ovclick{position:fixed;z-index:4000;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,0.75);cursor:pointer }


/*=======================================================
    z-index default
=========================================================*/
.header-wrap{position:fixed;z-index:2005;}
.containerWrap{position:relative;z-index:1006; }
.footer-wrap{position:relative;z-index:1007; }



/*=======================================================
    header-wrap 
=========================================================*/
.header-wrap {left:0; width:100%; min-width:320px; top:0;}
.header-wrap:before{position:absolute; left:50%;margin-left:-1000px; top:0; box-sizing:border-box;width:2000px; height:100%; display:block; content:""; background:none; z-index:-1;-webkit-transition: all 0.3s ease-out;-moz-transition: all 0.3s ease-out;-o-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}
.header{}




/* ======================================================
   container-wrap 
=========================================================*/
.container-wrap.mcontainer{padding:0; }
.container-wrap.mcontainer .content{ min-height:400px;}
.container-wrap.scontainer .content{ min-height:400px; padding-bottom:50px;}


.page-ctrl{position:relative; padding-top:20px;}
.page-ctrl .bt-prev{display:inline-block;vertical-align:top;;z-index:4001; width:47px; height:44px; background:url(../_Img/Sub/bt-prev.png) no-repeat center center; background-size:100% auto ;}
	@media only screen and (max-width:999px) {
		.page-ctrl .bt-prev{ width:34px;height:32px; }
	}
	@media only screen and (max-width:680px) {
		.page-ctrl{padding-top:12px;}
		.page-ctrl .bt-prev{ width:28px;height:26px; }
	}
	@media only screen and (max-width:480px) {
		.page-ctrl .bt-prev{ width:22px;height:20px; }
	}

/* ======================================================
   footer-wrap 
=========================================================*/
.footer-wrap {display:block; position:relative;}
.footer{}
`
,{ parseMediaQueries: true }
);
