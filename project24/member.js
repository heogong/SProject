import transform from "css-to-react-native-transform";

export const member = transform(`
@charset "utf-8";

/* member-wrap.select */
.memberWrap.select {position:relative; padding:40px 30px;}
.memberWrap.select .logo{text-align:center; padding:10vw 0 7vw 0}
.memberWrap.select .logo img{width:36%; max-width:221px;}

.memberWrap.select ul{ max-width:600px; margin:0 auto;}
.memberWrap.select li{margin-top:1.5vw;}
.memberWrap.select li:first-child{margin-top:0;}
.memberWrap.select li a{ display:block; color:#fff; text-align:center; background:#28c8f5; padding:1.5vw 0;}
.memberWrap.select li .btxt{ display:block;line-height:1.2em; font-size:2vw; font-weight:900}
.memberWrap.select li .stxt{ display:block;line-height:1.2em; font-size:1.5vw; margin-top:10px;}
.memberWrap.select .other-btn{ margin-top:2vw; color:#28c8f5; text-align:center; display:block; letter-spacing:-0.02em;line-height:1.2em; font-size:1.5vw;}
	@media only screen and (max-width:999px) {
		.memberWrap.select{ padding:30px 20px;}
		.memberWrap.select ul{ max-width:600px;}
		.memberWrap.select li{margin-top:15px;}
		.memberWrap.select li a{padding:17px 0;}
		.memberWrap.select li .btxt{font-size:24px;}
		.memberWrap.select li .stxt{font-size:19px;margin-top:7px;}
		.memberWrap.select .other-btn{margin-top:15px; font-size:19px;}
	}
	@media only screen and (max-width:680px) {
		.memberWrap.select{ padding:25px 20px;}
		.memberWrap.select ul{ max-width:94%;}
		.memberWrap.select li{margin-top:10px;}
		.memberWrap.select li a{padding:12px 0;}
		.memberWrap.select li .btxt{font-size:21px;}
		.memberWrap.select li .stxt{font-size:17px;margin-top:5px;}
		.memberWrap.select .other-btn{font-size:17px;}
	}
	@media only screen and (max-width:480px) {
		.memberWrap.select .logo{padding:100px 0 60px 0}
		.memberWrapselectlogo{padding:100px 0 60px 0}
		.memberWrap.select li .btxt{font-size:19px;}
		.memberWrap.select li .stxt{font-size:15px;}
		.memberWrap.select .other-btn{margin-top:15px;font-size:15px;}
	}
	@media only screen and (max-width:380px) {
		.memberWrap.select{ padding:25px 15px;}
		.memberWrap.select li .btxt{font-size:17px;}
		.memberWrap.select li .stxt{font-size:14px;}
		.memberWrap.select .other-btn{font-size:14px;}
	}



/* member-wrap.login */
.memberWrap.login{padding:40px 30px;}
.memberWrap.login .logo{text-align:center; padding:7vw 0 0 0}
.memberWrap.login .logo img{width:36%; max-width:201px;}
.memberWrap.login .stit{line-height:1.4em;letter-spacing:-0.045em; padding-bottom:15px; color:rgba(30,50,50,0.5); text-align:center; font-size:1.8vw; margin-top:4vw;}
.memberWrap.login .login-con{background:#28c8f5; padding:3.5vw; box-sizing:border-box;}
.memberWrap.login .login-input{}
.memberWrap.login .login-input li{margin-top:15px;}
.memberWrap.login .login-input li:first-child{margin-top:0;}

.memberWrap.login .chk-input input{padding:0 15px 0 80px;}
.memberWrap.login .chk-input.email:after{position:absolute;width:30px;height:24px; left:25px; top:50%;margin-top:-12px;background:url(../_Img/Sub/ico-email.png) no-repeat center center ;display:block; content:""}
.memberWrap.login .chk-input.password:after{position:absolute;width:30px;height:32px;left:25px; top:50%;margin-top:-16px;background:url(../_Img/Sub/ico-password.png) no-repeat center center ;display:block; content:""}

.memberWrap.login .save{padding:1.5vw 0; position:relative;}	
.memberWrap.login .save .find-btn{position:absolute; right:0; top:1.5vw; line-height:1.1em; font-size:21px; color:#fff;}

.memberWrap.login h4{font-size:2.2vw; color:#fff; text-align:center; line-height:1.2em; margin-bottom:1.5vw;}
.memberWrap.login .login-sns{font-size:0; text-align:center;}
.memberWrap.login .login-sns li{margin:0 0.5vw; display:inline-block;vertical-align:top;}
.memberWrap.login .login-sns li a{ border:2px solid #fff; border-radius:10px; width:100px;height:100px; display:block;background:url(../_Img/Sub/ico-kakao.png) no-repeat center center; background-size:60% auto}
.memberWrap.login .login-sns li:first-child a{background:url(../_Img/Sub/ico-naver.png) no-repeat center center; background-size:42% auto}

.memberWrap.login .btn-wrap{}
.memberWrap.login .btn-wrap:after{display:block; content:"";clear:both;}
.memberWrap.login .join-btn{border:1px solid #fff;box-sizing:border-box; line-height:65px;  color:#fff;text-align:center; font-size:21px; font-weight:500; width:49.5%;display:inline-block;vertical-align:top; float:left;}
.memberWrap.login .login-btn{border:1px solid #fff;background:#fff;box-sizing:border-box; color:#28c8f5;line-height:65px;text-align:center; font-size:21px; font-weight:500;width:49.5%;display:inline-block;vertical-align:top; float:right;}

	@media only screen and (max-width:999px) {
		.memberWrap.login{ padding:30px 20px;}
		.memberWrap.login .stit{font-size:19px; margin-top:40px;padding-bottom:12px;}
		.memberWrap.login .login-con{padding:35px}
		.memberWrap.login .login-input li{margin-top:12px;}

		.memberWrap.login .chk-input input{padding:0 12px 0 60px;}
		.memberWrap.login .chk-input.email:after{background-size:24px; left: 15px;}
		.memberWrap.login .chk-input.password:after{background-size:24px; left: 15px;}

		.memberWrap.login .save{padding:20px 0;}
		.memberWrap.login .save .find-btn{top:20px; font-size:19px;}
		
		.memberWrap.login h4{font-size:24px; margin-bottom:12px;}
		.memberWrap.login .login-sns li{margin:0 5px ; }
		.memberWrap.login .login-sns li a{border:1px solid #fff;border-radius:6px;width:80px; height:80px;}
		.memberWrap.login .join-btn, .member-wrap.login .login-btn{font-size:19px;line-height:54px}
	}
	@media only screen and (max-width:680px) {
		.memberWrap.login{ padding:25px 20px;}
		.memberWrap.login .stit{font-size:17px; margin-top:30px;}
		.memberWrap.login .login-con{padding:30px}
		.memberWrap.login .login-input li{margin-top:10px;}
		
		.memberWrap.login .chk-input input{padding:0 10px 0 50px;}
		.memberWrap.login .chk-input.email:after{background-size:18px; left: 7px;}
		.memberWrap.login .chk-input.password:after{background-size:18px; left: 7px;}

		.memberWrap.login .save{padding:15px 0;}
		.memberWrap.login .save .find-btn{top:15px; font-size:17px;}

		.member-wrap.login h4{font-size:21px;margin-bottom:10px;}
		.member-wrap.login .login-sns li a{width:70px; height:70px;}
		.member-wrap.login .join-btn, .member-wrap.login .login-btn{font-size:17px;line-height:46px}
	}
	@media only screen and (max-width:480px) {
		.member-wrap.login .stit{font-size:15px; margin-top:25px;padding-bottom:10px;}
		.member-wrap.login .login-con{padding:25px}
		.member-wrap.login .login-input li{margin-top:7px;}
		
		.member-wrap.login .chk-input input{padding:0 10px 0 45px;}

		.member-wrap.login .save{padding:12px 0;}
		.member-wrap.login .save .find-btn{top:12px; font-size:14px;}

		.member-wrap.login h4{font-size:19px;}
		.member-wrap.login .login-sns li a{width:60px; height:60px;}
		.member-wrap.login .join-btn, .member-wrap.login .login-btn{font-size:15px;line-height:40px}
	}
	@media only screen and (max-width:380px) {
		.member-wrap.login{padding:25px 15px;}
		.member-wrap.login .stit{font-size:12px;}

		.member-wrap.login .login-con{padding:20px}
		.member-wrap.login .chk-input input{padding:0 10px 0 38px;}
		.member-wrap.login .chk-input.email:after{background-size:16px; left:4px;}
		.member-wrap.login .chk-input.password:after{background-size:16px; left:4px;}

		.member-wrap.login .save .find-btn{ font-size:12px; line-height:1.24em;}
		.member-wrap.login .join-btn, .member-wrap.login .login-btn{font-size:14px;line-height:36px}
		
		.member-wrap.login h4{font-size:17px;}
		.member-wrap.login .login-sns li a{width:50px; height:50px;}
	}




/* member-wrap.find */
.member-wrap.find{padding:40px 30px;}
.member-wrap.find .stit{margin-top:2.5vw;line-height:1.2em;letter-spacing:-0.045em; font-weight:500; margin-bottom:3vw; color:#0b2024; text-align:left; font-size:4.5vw; }
.member-wrap.find .find-con{background:#28c8f5; padding:3.5vw; box-sizing:border-box;}

.member-wrap.find .find-tab:after{display:block; content:"";clear:both;}
.member-wrap.find .find-tab li{float:left; width:50%;}
.member-wrap.find .find-tab li a{background:#d6f1ff;line-height:68px; color:#28c8f5;text-align:center; display:block; font-size:24px; font-weight:500;}
.member-wrap.find .find-tab li.active a{background:#28c8f5;color:#fff;}


.member-wrap.find .find-input{ padding:3.5vw 0}
.member-wrap.find .find-input li{margin-top:20px;}
.member-wrap.find .find-input li:first-child{margin-top:0;}

.member-wrap.find .modify-input{ margin-top:3vw; padding:3.5vw 0}
.member-wrap.find .modify-input li{margin-top:20px;}
.member-wrap.find .modify-input li:first-child{margin-top:0;}

.member-wrap.find .find-input .ex, .member-wrap.find .modify-input .ex{ font-size:19px; margin-top:10px; color:#fff; letter-spacing:-0.03em;}

.member-wrap.find .field.sms{padding-right:170px; position:Relative;}
.member-wrap.find .field.sms .cerfity-btn{position:Absolute; right:0; top:0;}

.member-wrap.find .btn-wrap{}
.member-wrap.find .enter-btn{border:2px solid #28c8f5;box-sizing:border-box; line-height:65px;  color:#28c8f5;text-align:center; font-size:21px; font-weight:500; display:block;}
.member-wrap.find .login-btn{display:none;border:2px solid #28c8f5;box-sizing:border-box; line-height:65px;  color:#28c8f5;text-align:center; font-size:21px; font-weight:500;}
.member-wrap.find .modify-btn{display:none;border:2px solid #28c8f5;box-sizing:border-box; line-height:65px;  color:#28c8f5;text-align:center; font-size:21px; font-weight:500;}

.member-wrap.find .cerfity-btn{ display:block;width:160px; border:1px solid #fff;box-sizing:border-box; line-height:68px;  color:#fff;text-align:center; font-size:21px; font-weight:500; }

.member-wrap.find .find-con .result{ display:none;text-align:center; padding:7vw 0 ;text-align:center;}
.member-wrap.find .find-con .result p{font-size:2vw; color:#fff; letter-spacing:-0.03em; line-height:1.5em;}

	@media only screen and (max-width:999px) {
		.member-wrap.find{ padding:30px 20px;}
		.member-wrap.find .stit{font-size:35px; margin-top:35px;margin-bottom:35px;}
		.member-wrap.find .find-con{padding:35px}

		.member-wrap.find .find-tab li a{font-size:21px; line-height:58px;}
		
		.member-wrap.find .find-input li, .member-wrap.find .modify-input li{margin-top:15px;}
		.member-wrap.find .find-input .ex, .member-wrap.find .modify-input .ex{font-size:17px;}
		.member-wrap.find .field.sms{padding-right:140px;}
			
		.member-wrap.find .enter-btn,.member-wrap.find .login-btn, .member-wrap.find .modify-btn{font-size:19px;line-height:54px}
		.member-wrap.find .cerfity-btn{width:130px;line-height:58px; font-size:19px;}
		
		.member-wrap.find .find-con .result{padding:67px 0}
		.member-wrap.find .find-con .result p{font-size:19px;}
	}
	@media only screen and (max-width:680px) {
		.member-wrap.find{ padding:25px 20px;}
		.member-wrap.find .stit{font-size:31px; margin-top:30px;margin-bottom:30px;}
		.member-wrap.find .find-con{padding:30px}
		.member-wrap.find .find-tab li a{font-size:19px; line-height:46px;}

		.member-wrap.find .find-input li, .member-wrap.find .modify-input li{margin-top:12px;}
		.member-wrap.find .find-input .ex, .member-wrap.find .modify-input .ex{font-size:15px; margin-top:7px;}
		
		.member-wrap.find .field.sms{padding-right:110px;}
		.member-wrap.find .enter-btn, .member-wrap.find .login-btn, .member-wrap.find .modify-btn{font-size:17px;line-height:46px}
		.member-wrap.find .cerfity-btn{line-height:48px; width:105px; font-size:17px;}
		
		.member-wrap.find .find-con .result{padding:57px 0}
		.member-wrap.find .find-con .result p{font-size:17px;}
	}
	@media only screen and (max-width:480px) {
		.member-wrap.find .stit{font-size:27px; margin-top:25px;margin-bottom:25px;}
		.member-wrap.find .find-con{padding:25px}
		.member-wrap.find .find-tab li a{font-size:17px; line-height:44px;}

		.member-wrap.find .find-input li, .member-wrap.find .modify-input li{margin-top:10px;}
		.member-wrap.find .find-input .ex, .member-wrap.find .modify-input .ex{font-size:13px;}
		
		.member-wrap.find .enter-btn, .member-wrap.find .login-btn, .member-wrap.find .modify-btn{font-size:17px;line-height:40px}
		.member-wrap.find .cerfity-btn{line-height:40px; font-size:15px;}

		.member-wrap.find .find-con .result p{font-size:15px;}
	}
	@media only screen and (max-width:380px) {
		.member-wrap.find{padding:25px 15px;}
		.member-wrap.find .find-tab li a{font-size:15px;}

		.member-wrap.find .find-con{padding:20px}
		.member-wrap.find .field.sms{padding-right:100px;}
		.member-wrap.find .cerfity-btn{width:95px;line-height:40px; font-size:13px;}

		.member-wrap.find .find-con .result p{font-size:13px;}
	}



/* join-wrap.sel */
.join-wrap.sel{padding:40px 30px;}
.join-wrap.sel .tit{padding:2.5vw 0; position:relative; margin-bottom:10vw}
.join-wrap.sel .tit .btxt:after{width:166px;height:166px; position:absolute; right:0; top:50%;margin-top:-88px;background:url(../_Img/Member/join-ico01.png) no-repeat right center; background-size:165px auto; display:block;content:"";}
.join-wrap.sel .tit .btxt{position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024; text-align:left; font-size:4.5vw; }
.join-wrap.sel .tit .stxt{margin-top:2vw;line-height:1.25em;letter-spacing:-0.045em; font-weight:400;color:rgba(30,30,50,0.6); text-align:left; font-size:2.5vw; }
.join-wrap.sel .join-sel{margin:0 -1%}
.join-wrap.sel .join-sel:after{display:block; content:""; clear:both;}
.join-wrap.sel .join-sel li{ float:left; width:31.333333%; margin:0 1%}
.join-wrap.sel .join-sel li a{display:block; padding-top:24vw; background-color:#28c8f5 !important; text-align:center; color:#fff; font-size:4vw; box-sizing:border-box;}
.join-wrap.sel .join-sel li:nth-child(1) a{ background:url(../_Img/Member/join-email.png) no-repeat center 32%; background-size:45%}
.join-wrap.sel .join-sel li:nth-child(2) a{ background:url(../_Img/Member/join-naver.png) no-repeat center 32%; background-size:35%}
.join-wrap.sel .join-sel li:nth-child(3) a{ background:url(../_Img/Member/join-kakao.png) no-repeat center 32%; background-size:45%}

	@media only screen and (max-width:999px) {
		.join-wrap.sel{ padding:30px 20px;}
		.join-wrap.sel .tit{padding:35px 0; margin-bottom:50px;}
		.join-wrap.sel .tit .btxt{font-size:35px;}
		.join-wrap.sel .tit .stxt{font-size:21px; margin-top:15px;}
		.join-wrap.sel .tit .btxt:after{width:120px;height:120px; margin-top:-60px; background-size:110px auto;}

		.join-wrap.sel .join-sel li a{font-size:21px;padding-top:75%; }
	}
	@media only screen and (max-width:680px) {
		.join-wrap.sel{ padding:25px 20px;}
		.join-wrap.sel .tit{padding:30px 0}
		.join-wrap.sel .tit .btxt:after{width:100px;height:100px; margin-top:-50px; background-size:90px auto;}
		.join-wrap.sel .tit .btxt{font-size:31px;}
		.join-wrap.sel .tit .stxt{font-size:19px;}
		.join-wrap.sel .join-sel li a{font-size:19px;padding-top:72%; }
	}
	@media only screen and (max-width:480px) {
		.join-wrap.sel .tit{padding:25px 0}
		.join-wrap.sel .tit .btxt:after{width:90px;height:90px; margin-top:-45px; background-size:80px auto;}
		.join-wrap.sel .tit .btxt{font-size:27px;}
		.join-wrap.sel .tit .stxt{font-size:17px;}
		.join-wrap.sel .join-sel li a{font-size:15px;padding-top:70%;}
	}
	@media only screen and (max-width:380px) {
		.join-wrap.sel{padding:25px 15px;}
		.join-wrap.sel .tit .stxt{font-size:16px;}
	}



/* join-wrap.step */
.join-wrap.step{padding:40px 30px;}
.join-wrap.step .tit{padding:2.5vw 0; position:relative; margin-bottom:10vw}
.join-wrap.step .tit:before{width:25vw;height:12px; background:#28c8f5; position:absolute; left:0; bottom:-6px; display:block; content:""; z-index:1;}
.join-wrap.step .tit:after{width:100%;height:12px; background:#d6f1ff; position:absolute; left:0; bottom:-6px; display:block; content:""; z-index:-1;}
.join-wrap.step .tit .btxt{position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024; text-align:left; font-size:4.5vw; }
.join-wrap.step .tit .btxt span{font-weight:800; color:#28c8f5; position:absolute; right:0; bottom:-10px;; font-size:11vw; line-height:1em;}
.join-wrap.step .enter-btn{border:2px solid #28c8f5;box-sizing:border-box; line-height:65px; background:#28c8f5; color:#fff;text-align:center; font-size:21px; font-weight:500; display:block;}

.join-wrap.step .join-input{min-height:35vw}
.join-wrap.step .join-input li{margin-top:25px}
.join-wrap.step .join-input li:first-child{margin-top:0;}
.join-wrap.step .chk-input input{border:1px solid #c6c8c9}
.join-wrap.step .chk-input .error{color:#ff6b00; display:none; letter-spacing:-0.03em; margin-top:10px; line-height:1.2em;  font-size:19px;}
.join-wrap.step .chk-input.able:after{width:40px;height:40px; background:url(../_Img/Member/input-able.png) no-repeat center ;background-size:100% auto; position:absolute; right:10px; top:0.8vw; display:block; content:"";}
.join-wrap.step .chk-input.disable .error{display:block;}

.join-wrap.step .field.sms{padding-right:170px; position:Relative;}
.join-wrap.step .field.sms .cerfity-btn{position:Absolute; right:0; top:0;}
.join-wrap.step .field.sms .chk-input .ex{display:none; color:#32b400; letter-spacing:-0.03em; margin-top:10px; line-height:1.2em; font-size:19px;}
.join-wrap.step .field.sms .chk-input.able:after{display:none}
.join-wrap.step .field.sms .chk-input.able .ex{display:block;}
.join-wrap.step .cerfity-btn{ display:block;width:160px; border:1px solid #28c8f5; background:#28c8f5;box-sizing:border-box; line-height:68px;  color:#fff;text-align:center; font-size:21px; font-weight:500; }
	@media only screen and (max-width:999px) {
		.join-wrap.step{ padding:30px 20px;}
		.join-wrap.step .tit{padding:35px 0; margin-bottom:40px;}
		.join-wrap.step .tit .btxt{font-size:35px;}
		.join-wrap.step .tit .btxt span{ font-size:100px; bottom:-5px;}
		
		.join-wrap.step .join-input{min-height:360px}
		.join-wrap.step .join-input li{margin-top:20px;}
		.join-wrap.step .chk-input .error, .join-wrap.step .field.sms .chk-input .ex{font-size:17px;}
		.join-wrap.step .chk-input.able:after{width:30px;height:30px; top:15px;}
		.join-wrap.step .enter-btn{font-size:19px;line-height:54px}

		.join-wrap.step .field.sms{padding-right:140px;}
		.join-wrap.step .field.sms .cerfity-btn{width:130px;line-height:58px; font-size:19px;}
	}
	@media only screen and (max-width:680px) {
		.join-wrap.step{ padding:25px 20px;}
		.join-wrap.step .tit{padding:30px 0}
		.join-wrap.step .tit:before{height:8px; bottom:0;}
		.join-wrap.step .tit:after{height:8px; bottom:0;}
		.join-wrap.step .tit .btxt{font-size:31px;}
		.join-wrap.step .tit .btxt span{font-size:80px; bottom:-5px;}
		
		.join-wrap.step .join-input{min-height:300px}
		.join-wrap.step .join-input li{margin-top:15px;}
		.join-wrap.step .chk-input .error, .join-wrap.step .field.sms .chk-input .ex{font-size:15px; margin-top:7px;}
		.join-wrap.step .chk-input.able:after{width:25px;height:25px; top:13px;}
		.join-wrap.step .enter-btn{font-size:17px;line-height:46px}

		.join-wrap.step .field.sms{padding-right:110px;}
		.join-wrap.step .field.sms .cerfity-btn{line-height:48px; width:105px; font-size:17px;}
	}
	@media only screen and (max-width:480px) {
		.join-wrap.step .tit{padding:25px 0}
		.join-wrap.step .tit .btxt{font-size:27px;}
		.join-wrap.step .tit .btxt span{font-size:65px; bottom:-2px;}
		.join-wrap.step .join-input{min-height:220px}
		.join-wrap.step .chk-input .error, .join-wrap.step .field.sms .chk-input .ex{font-size:14px; margin-top:5px;}
		.join-wrap.step .chk-input.able:after{width:20px;height:20px; top:11px;}
		.join-wrap.step .enter-btn{font-size:17px;line-height:40px}

		.join-wrap.step .field.sms .cerfity-btn{line-height:40px; font-size:15px;}
	}
	@media only screen and (max-width:380px) {
		.join-wrap.step{padding:25px 15px;}

		.join-wrap.step .chk-input .error, .join-wrap.step .field.sms .chk-input .ex{font-size:13px;}
		.join-wrap.step .field.sms{padding-right:100px;}
		.join-wrap.step .field.sms .cerfity-btn{width:95px;line-height:40px; font-size:13px;}
	}


/* join-wrap.end */
.join-wrap.end{padding:40px 30px;}
.join-wrap.end .btxt{margin-top:7vw;background:url(../_Img/Member/join-end.png) no-repeat center top; background-size:90px auto; padding-top:150px;text-align:center;position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024;font-size:4.5vw; }
.join-wrap.end .stxt{color:rgba(30,30,50.0.6); text-align:center; font-size:2vw; line-height:1.45em; letter-spacing:-0.03em; margin:12vw 0}
	@media only screen and (max-width:999px) {
		.join-wrap.end{ padding:30px 20px;}
		.join-wrap.end .btxt{font-size:35px;background-size:70px; padding-top:120px; margin-top:45px;}
		.join-wrap.end .stxt{margin:150px 0; font-size:19px;}
	}
	@media only screen and (max-width:680px) {
		.join-wrap.end{ padding:25px 20px;}
		.join-wrap.end .btxt{font-size:31px;background-size:50px; padding-top:90px; margin-top:45px;}
		.join-wrap.end .stxt{margin:120px 0; font-size:17px;}
	}
	@media only screen and (max-width:480px) {
		.join-wrap.end .btxt{font-size:27px;background-size:40px; padding-top:70px; margin-top:45px;}
		.join-wrap.end .stxt{margin:100px 0; font-size:15px;}
		
	}
	@media only screen and (max-width:380px) {
		.join-wrap.end{padding:25px 15px;}
		
	}



/* join-wrap.license */
.join-wrap.license{padding:40px 30px;}
.join-wrap.license .tit{padding:2.5vw 0; position:relative; margin-bottom:10vw}
.join-wrap.license .tit:before{width:55vw;height:12px; background:#28c8f5; position:absolute; left:0; bottom:-6px; display:block; content:""; z-index:1;}
.join-wrap.license .tit:after{width:100%;height:12px; background:#d6f1ff; position:absolute; left:0; bottom:-6px; display:block; content:""; z-index:-1;}
.join-wrap.license .tit .btxt{position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024; text-align:left; font-size:4.5vw; }
.join-wrap.license .tit .btxt span{font-weight:800; color:#28c8f5; position:absolute; right:0; bottom:-10px;; font-size:11vw; line-height:1em;}
.join-wrap.license .license-img	{border:1px solid #c6c8c9; position:relative; min-height:40vw;}
.join-wrap.license .license-img	img{width:100%;}
.join-wrap.license .license-img a{position:absolute; left:0; top:0; width:100%;height:100%;}
.join-wrap.license .license-img a span{ color:#28c8f5; width:100%; font-size:2vw;text-align:center; padding-top:80px;background:url(../_Img/Sub/ico-camera.png) no-repeat center top; background-size:72px auto; font-weight:500;position:absolute; left:50%; top:50%;-webkit-transform: translate(-50%, -50%);  -moz-transform: translate(-50%, -50%);  -ms-transform: translate(-50%, -50%);  -o-transform: translate(-50%, -50%);  transform: translate(-50%, -50%);}
	
.join-wrap.license .license-write{padding:2.5vw 0; position:relative;text-align:center;}
.join-wrap.license .license-write .btxt{position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024;  font-size:4.5vw; }
.join-wrap.license .license-write .stxt{margin-top:30px;position:relative;line-height:1.4em;letter-spacing:-0.045em; font-weight:400;  color:rgba(30,30,50,0.6);  font-size:2.5vw; }


.join-wrap.license .bank-write{padding:2.5vw 0; position:relative;text-align:center;}
.join-wrap.license .bank-write .btxt{position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024;  font-size:4.5vw; }
.join-wrap.license .bank-write .stxt{margin-top:30px;position:relative;line-height:1.4em;letter-spacing:-0.045em; font-weight:400;  color:rgba(30,30,50,0.6);  font-size:2.5vw; }


.join-wrap.license .license-input{min-height:35vw}
.join-wrap.license .license-input li{margin-top:25px}
.join-wrap.license .license-input li:first-child{margin-top:0;}

.join-wrap.license .chk-input input{border:1px solid #c6c8c9}
.join-wrap.license .chk-input .error{color:#ff6b00; display:none; letter-spacing:-0.03em; margin-top:10px; line-height:1.2em;  font-size:19px;}
.join-wrap.license .chk-input.able:after{width:40px;height:40px; background:url(../_Img/Member/input-able.png) no-repeat center ;background-size:100% auto; position:absolute; right:10px; top:0.8vw; display:block; content:"";}
.join-wrap.license .chk-input.disable .error{display:block;}

.join-wrap.license .field.sms{padding-right:170px; position:Relative;}
.join-wrap.license .field.sms .cerfity-btn{position:Absolute; right:0; top:0;}
.join-wrap.license .field.sms .chk-input .ex{display:none; color:#32b400; letter-spacing:-0.03em; margin-top:10px; line-height:1.2em; font-size:19px;}
.join-wrap.license .field.sms .chk-input.able:after{display:none}
.join-wrap.license .field.sms .chk-input.able .ex{display:block;}
.join-wrap.license .cerfity-btn{ display:block;width:160px; border:1px solid #28c8f5; background:#28c8f5;box-sizing:border-box; line-height:68px;  color:#fff;text-align:center; font-size:21px; font-weight:500; }

	
.join-wrap.license .upload-photo{margin-top:5vw;min-height:42.5vw; position:relative; background:url(../_Img/Member/license-bg01.png) no-repeat center top; background-size:35% auto;}
.join-wrap.license .upload-photo input[type="file"]{display:none}
.join-wrap.license .upload-photo label{position:absolute; width:28%;height:80%;;  text-align:center; display:block; color:#3f96d4;background:url(../_Img/Member/license-bg02.png) no-repeat center center #fff; background-size:70% auto;left:50%; top:50%;box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.1) ; -webkit-box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.1)  ; -moz-box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.1)  ; -webkit-transform: translate(-50%, -50%);  -moz-transform: translate(-50%, -50%);  -ms-transform: translate(-50%, -50%);  -o-transform: translate(-50%, -50%);  transform: translate(-50%, -50%);}
.join-wrap.license .upload-photo label:after{display:block;position:Absolute;border:none; right:50%;margin-right:-5vw; top:50%;margin-top:-5vw;; width:10vw; height:10vw;background:url(../_Img/Sub/photo-add.png) no-repeat center center; background-size:80% auto;content:""}
.join-wrap.license .upload-photo .add-file.show ~ label:after, .join-wrap.license .upload-photo .add-file.show ~ label{display:none}    
.join-wrap.license .upload-photo .add-file{position:absolute; width:28%; height:auto;;  text-align:center; display:block; color:#3f96d4;background:#fff; background-size:70% auto;left:50%; top:50%;box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.1) ; -webkit-box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.1)  ; -moz-box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.1)  ; -webkit-transform: translate(-50%, -50%);  -moz-transform: translate(-50%, -50%);  -ms-transform: translate(-50%, -50%);  -o-transform: translate(-50%, -50%);  transform: translate(-50%, -50%);}
.join-wrap.license .upload-photo .add-file.show{display:block; }
.join-wrap.license .upload-photo .add-file img{width:100%; vertical-align:middle}

.join-wrap.license .upload-photo.bank label{background:url(../_Img/Member/bank-bg02.png) no-repeat center center rgba(40,200,245,0.15); background-size:70% auto;}

.join-wrap.license .show .delete-file{display:block;position:Absolute;cursor:pointer;border:none;width:50px;height:50px; left:50%;margin-left:-25px; top:50%;margin-top:-25px;  background:url(../_Img/Sub/photo-delete.png) no-repeat center center rgba(0,0,0,0.75); background-size:50% auto;}
.join-wrap.license .delete-file{display:none;}


	@media only screen and (max-width:999px) {
		.join-wrap.license{ padding:30px 20px;}
		.join-wrap.license .tit{padding:35px 0; margin-bottom:40px;}
		.join-wrap.license .tit .btxt{font-size:35px;}
		.join-wrap.license .tit .btxt span{ font-size:100px; bottom:-5px;}

		.join-wrap.license .license-write {padding:35px 0}
		.join-wrap.license .license-write .btxt{font-size:35px;}
		.join-wrap.license .license-write .stxt{font-size:21px;margin-top:20px}

		.join-wrap.license .bank-write {padding:35px 0}
		.join-wrap.license .bank-write .btxt{font-size:35px;}
		.join-wrap.license .bank-write .stxt{font-size:21px;margin-top:20px}
		
		.join-wrap.license .license-img{min-height:300px}
		.join-wrap.license .license-img a span{padding-top:55px; background-size:50px auto; font-size:21px;}

		.join-wrap.license .license-input{min-height:360px}
		.join-wrap.license .license-input li{margin-top:20px;}
		.join-wrap.license .chk-input .error, .join-wrap.license .field.sms .chk-input .ex{font-size:17px;}
		.join-wrap.license .chk-input.able:after{width:30px;height:30px; top:15px;}

		.join-wrap.license .field.sms{padding-right:140px;}
		.join-wrap.license .field.sms .cerfity-btn{width:130px;line-height:58px; font-size:19px;}

		.join-wrap.license .upload-photo{margin-top:30px; background-size:370px auto; min-height:471px;}
		.join-wrap.license .upload-photo label, .join-wrap.license .upload-photo.bank label{ width:260px; height:70%;background-size:200px auto;}

		.join-wrap.license .upload-photo .add-file{width:260px; height:auto;}
		.join-wrap.license .show .delete-file{width:40px;height:40px; margin-left:-20px;margin-top:-20px;}

	}
	@media only screen and (max-width:680px) {
		.join-wrap.license{ padding:25px 20px;}
		.join-wrap.license .tit{padding:30px 0}
		.join-wrap.license .tit:before{height:8px; bottom:0;}
		.join-wrap.license .tit:after{height:8px; bottom:0;}
		.join-wrap.license .tit .btxt{font-size:31px;}
		.join-wrap.license .tit .btxt span{font-size:80px; bottom:-5px;}

		.join-wrap.license .license-write {padding:30px 0}
		.join-wrap.license .license-write .btxt{font-size:31px;}
		.join-wrap.license .license-write .stxt{font-size:19px;margin-top:20px}

		.join-wrap.license .bank-write {padding:30px 0}
		.join-wrap.license .bank-write .btxt{font-size:31px;}
		.join-wrap.license .bank-write .stxt{font-size:19px;margin-top:20px}
		
		.join-wrap.license .license-img{min-height:250px}
		.join-wrap.license .license-img a span{padding-top:45px; background-size:40px auto; font-size:19px;}

		.join-wrap.license .license-input{min-height:300px}
		.join-wrap.license .license-input li{margin-top:15px;}
		.join-wrap.license .chk-input .error, .join-wrap.license .field.sms .chk-input .ex{font-size:15px; margin-top:7px;}
		.join-wrap.license .chk-input.able:after{width:25px;height:25px; top:13px;}

		.join-wrap.license .field.sms{padding-right:110px;}
		.join-wrap.license .field.sms .cerfity-btn{line-height:48px; width:105px; font-size:17px;}

		.join-wrap.license .upload-photo{margin-top:30px; background-size:300px auto; min-height:380px;}
		.join-wrap.license .upload-photo label, .join-wrap.license .upload-photo.bank label{ width:220px; height:70%;background-size:180px auto;}
		.join-wrap.license .upload-photo .add-file{width:220px; height:auto;}
		.join-wrap.license .show .delete-file{width:30px;height:30px; margin-left:-15px;margin-top:-15px;}
	}
	@media only screen and (max-width:480px) {
		.join-wrap.license .tit{padding:25px 0}
		.join-wrap.license .tit .btxt{font-size:27px;}
		.join-wrap.license .tit .btxt span{font-size:65px; bottom:-2px;}

		.join-wrap.license .license-write {padding:25px 0}
		.join-wrap.license .license-write .btxt{font-size:27px;}
		.join-wrap.license .license-write .stxt{font-size:15px;margin-top:15px}

		.join-wrap.license .bank-write {padding:25px 0}
		.join-wrap.license .bank-write .btxt{font-size:27px;}
		.join-wrap.license .bank-write .stxt{font-size:15px;margin-top:15px}
		
		.join-wrap.license .license-img{min-height:200px}
		.join-wrap.license .license-img a span{padding-top:40px; background-size:40px auto; font-size:17px;}

		.join-wrap.license .license-input{min-height:220px}
		.join-wrap.license .chk-input .error, .join-wrap.license .field.sms .chk-input .ex{font-size:14px; margin-top:5px;}
		.join-wrap.license .chk-input.able:after{width:20px;height:20px; top:11px;}

		.join-wrap.license .btn-wrap .bl-btn.mg15t{margin-top:10px;}

		.join-wrap.license .upload-photo{margin-top:30px; background-size:220px auto; min-height:280px;}
		.join-wrap.license .upload-photo label, .join-wrap.license .upload-photo.bank label{ width:170px; height:70%;background-size:140px auto;}
		.join-wrap.license .upload-photo .add-file{width:170px; height:auto;}
	}
	@media only screen and (max-width:380px) {
		.join-wrap.license{padding:25px 15px;}
		.join-wrap.license .chk-input .error, .join-wrap.license .field.sms .chk-input .ex{font-size:13px;}
		.join-wrap.license .field.sms{padding-right:100px;}
		.join-wrap.license .field.sms .cerfity-btn{width:95px;line-height:40px; font-size:13px;}
	}

.join-wrap.license .depart{ margin:0 -1%}
.join-wrap.license .depart:after{display:block; content:"";clear:both;}
.join-wrap.license .depart li{float:left; width:48%; margin:0 1%;}
.join-wrap.license .depart li a{position:relative;background-color:#53d3f7 !important;; display:block; padding:120px 0 30px 0; text-align:center; font-size:3vw; box-sizing:border-box; color:#fff; letter-spacing:-0.04em;}
.join-wrap.license .depart li a span{position:absolute; left:0; bottom:5vw; width:100%; text-align:center;}
.join-wrap.license .depart li:nth-child{float:right;}
.join-wrap.license .depart li:nth-child(n+3){margin-top:2%}
.join-wrap.license .depart li.active a{background-color:#28a0f0 !important;}
.join-wrap.license .depart li:nth-child(1) a{background:url(../_Img/Member/license-depart01.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(2) a{background:url(../_Img/Member/license-depart02.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(3) a{background:url(../_Img/Member/license-depart03.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(4) a{background:url(../_Img/Member/license-depart04.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(5) a{background:url(../_Img/Member/license-depart05.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(6) a{background:url(../_Img/Member/license-depart06.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(7) a{background:url(../_Img/Member/license-depart07.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(8) a{background:url(../_Img/Member/license-depart08.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(9) a{background:url(../_Img/Member/license-depart09.png) no-repeat center 32%; background-size:56%}
.join-wrap.license .depart li:nth-child(10) a{background:url(../_Img/Member/license-depart10.png) no-repeat center 32%; background-size:56%}

.join-wrap.license .day-sel{margin:0 -1%}
.join-wrap.license .day-sel:after{clear:both; display:block; content:""}
.join-wrap.license .day-sel li{float:left; width:12.2857%; margin:0 1%}
.join-wrap.license .day-sel li a{box-sizing:border-box; border:2px solid #5ed6f8; display:block; line-height:; position:relative; text-align:center; font-size:3vw; color:#5ed6f8}
.join-wrap.license .day-sel li a span{position:absolute; left:50%;  width:100%;top:50%;-webkit-transform: translate(-50%, -50%);  -moz-transform: translate(-50%, -50%);  -ms-transform: translate(-50%, -50%);  -o-transform: translate(-50%, -50%);  transform: translate(-50%, -50%);}
.join-wrap.license .day-sel li.active a {background:#5ed6f8; color:#fff;}

.join-wrap.license .time-sel{padding:3vw 0 3vw 0; position:relative;}
.join-wrap.license .time-sel:before{width:100%;height:100px; background:#fff; border:1px solid #5ed6f8; box-sizing:border-box;position:absolute; left:50%; top:50%;-webkit-transform: translate(-50%, -50%);  -moz-transform: translate(-50%, -50%);  -ms-transform: translate(-50%, -50%);  -o-transform: translate(-50%, -50%);  transform: translate(-50%, -50%); display:block; content:""; z-index:-1;}
.join-wrap.license .time-sel:after{display:block; content:""; clear:both;}
.join-wrap.license .time-sel .time-slide{float:left; width:50%; height:300px;}
.join-wrap.license .time-sel .time-slide li a{font-weight:700; line-height:100px; font-size:3vw; text-align:center ;display:block; color:#8e8e98;}
.join-wrap.license .time-sel .time-slide li.active a{color:#5ed6f8}
	
.join-wrap.license .time-ex{text-align:center;}
.join-wrap.license .time-ex p{line-height:1.45em; margin-bottom:25px;letter-spacing:-0.045em; font-weight:400;color:rgba(30,30,50,0.6); font-size:2.5vw; }	
	@media only screen and (max-width:999px) {
		.join-wrap.license .depart li a{font-size:21px; padding:90px 0 20px 0}
		.join-wrap.license .day-sel li a{ font-size:21px;}
		
		.join-wrap.license .time-sel{padding:20px 0 20px 0;} 
		.join-wrap.license .time-sel:before{height:80px;}
		.join-wrap.license .time-sel .time-slide{height:240px;}
		.join-wrap.license .time-sel .time-slide li a{font-size:27px; height:80px ; line-height:80px;}

		.join-wrap.license .time-ex p{font-size:19px; margin-bottom:20px;}
	}
	@media only screen and (max-width:680px) {
		.join-wrap.license .depart li a{font-size:19px; padding:70px 0 15px 0}
		.join-wrap.license .day-sel li a{ font-size:19px;}

		.join-wrap.license .time-sel{padding:15px 0 15px 0;} 
		.join-wrap.license .time-sel:before{height:60px;}
		.join-wrap.license .time-sel .time-slide{height:180px;}
		.join-wrap.license .time-sel .time-slide li a{font-size:24px; height:60px ; line-height:60px;}

		.join-wrap.license .time-ex p{font-size:17px; margin-bottom:15px;}
	}
	@media only screen and (max-width:480px) {
		.join-wrap.license .depart li a{font-size:17px; padding:60px 0 12px 0}
		.join-wrap.license .day-sel li a{ font-size:17px;}

		.join-wrap.license .time-sel{padding:12px 0 12px 0;} 
		.join-wrap.license .time-sel:before{height:40px;}
		.join-wrap.license .time-sel .time-slide{height:120px;}
		.join-wrap.license .time-sel .time-slide li a{font-size:19px; height:40px ; line-height:40px;}

		.join-wrap.license .time-ex p{font-size:15px; margin-bottom:10px;}
	}
	@media only screen and (max-width:380px) {
		.join-wrap.license .depart li a{font-size:14px}
		.join-wrap.license .day-sel li a{ font-size:14px;}

		.join-wrap.license .time-ex p{font-size:14px;}
	}



/* join-wrap.agree */
.join-wrap.agree{padding:40px 30px;}
.join-wrap.agree .tit{padding:2.5vw 0; position:relative;}
.join-wrap.agree .tit:before{width:100%;height:12px; background:#28c8f5; position:absolute; left:0; bottom:-6px; display:block; content:""; z-index:1;}
.join-wrap.agree .tit:after{width:100%;height:12px; background:#d6f1ff; position:absolute; left:0; bottom:-6px; display:block; content:""; z-index:-1;}
.join-wrap.agree .tit .btxt{position:relative;line-height:1.2em;letter-spacing:-0.045em; font-weight:500;  color:#0b2024; text-align:left; font-size:4.5vw; }
.join-wrap.agree .tit .btxt span{font-weight:800; color:#28c8f5; position:absolute; right:0; bottom:-10px;; font-size:11vw; line-height:1em;}

.join-wrap.agree .agree-sel{ padding:10px 0}
.join-wrap.agree .agree-sel li{margin-top:15px}
.join-wrap.agree .agree-sel li:first-child{margin-top:0}

.join-wrap.agree .stit{line-height:1.45em; border-bottom:1px solid #d2d2d6; text-align:center; padding:7vw 0;letter-spacing:-0.045em; font-weight:400;color:rgba(30,30,50,0.6); font-size:2.5vw; }
.join-wrap.agree .chk-check{display:block;}
.join-wrap.agree .chk-check input[type="checkbox"] + label{padding-left:0;}
.join-wrap.agree .chk-check input[type="checkbox"] + label:before{right:0; left:auto;border-color:#c6c8c9; border-radius:100%;background:url(../_Img/Sub/check-on3.png) no-repeat center center #fff; background-size:60% auto;}
.join-wrap.agree .chk-check input[type="checkbox"]:checked + label:before {border-color:#28c8f5;background:url(../_Img/Sub/check-on4.png) no-repeat center center #28c8f5; background-size:60% auto;}	
.join-wrap.agree .chk-check input[type="checkbox"]:checked + label{color:#28c8f5}
	@media only screen and (max-width:999px) {
		.join-wrap.agree{ padding:30px 20px;}
		.join-wrap.agree .tit{padding:35px 0;}
		.join-wrap.agree .tit .btxt{font-size:35px;}
		.join-wrap.agree .tit .btxt span{ font-size:100px; bottom:-5px;}
		.join-wrap.agree .agree-sel li{margin-top:10px;}
		.join-wrap.agree .stit{font-size:19px; padding:30px 0;}
	}
	@media only screen and (max-width:680px) {
		.join-wrap.agree{ padding:25px 20px;}
		.join-wrap.agree .tit{padding:30px 0}
		.join-wrap.agree .tit:before{height:8px; bottom:0;}
		.join-wrap.agree .tit:after{height:8px; bottom:0;}
		.join-wrap.agree .tit .btxt{font-size:31px;}
		.join-wrap.agree .tit .btxt span{font-size:80px; bottom:-5px;}

		.join-wrap.agree .stit{font-size:17px;}

		.join-wrap.agree .agree-sel li{margin-top:7px;}

		.join-wrap.agree .chk-check input[type="checkbox"] + label{line-height:20px;}
		.join-wrap.agree .chk-check input[type="checkbox"] + label:before{width:20px;height:20px;}

	}
	@media only screen and (max-width:480px) {
		.join-wrap.agree .tit{padding:25px 0}
		.join-wrap.agree .tit .btxt{font-size:27px;}
		.join-wrap.agree .tit .btxt span{font-size:65px; bottom:-2px;}

		.join-wrap.agree .stit{font-size:15px;}
		
		.join-wrap.agree .chk-check input[type="checkbox"] + label{line-height:20px;}
		.join-wrap.agree .chk-check input[type="checkbox"] + label:before{width:20px;height:20px;}
	}
	@media only screen and (max-width:380px) {
		.join-wrap.agree{padding:25px 15px;}
		.join-wrap.agree .stit{font-size:14px;}

		.join-wrap.agree .chk-check input[type="checkbox"] + label{line-height:20px;}
		.join-wrap.agree .chk-check input[type="checkbox"] + label:before{width:20px;height:20px;}
	}




.layer-wrap.cerfity{position:Absolute;text-align:center; max-width:560px; background:#fff; box-sizing:border-box; padding:2vw 4vw; display:none;}
.layer-wrap.cerfity p{ padding:20px 0 ; line-height:1.2em; font-size:1.5vw; color:#1e1e32}
.layer-wrap.cerfity .enter{background:#28c8f5; padding:15px 25px; font-size:1.4vw; color:#fff; display:inline-block;vertical-align:top;}
	@media only screen and (max-width:999px) {
		.layer-wrap.cerfity{padding:20px 0; width:50%; max-width:380px; min-width:280px;}
		.layer-wrap.cerfity p{font-size:19px;}
		.layer-wrap.cerfity .enter{font-size:17px; padding:12px 20px;}

	}
	@media only screen and (max-width:680px) {
		.layer-wrap.cerfity{padding:15px 0;}
		.layer-wrap.cerfity p{font-size:17px; padding:15px 0}
		.layer-wrap.cerfity .enter{font-size:15px; padding:12px 20px;}

	}
	@media only screen and (max-width:480px) {
		.layer-wrap.cerfity p{font-size:15px; padding:12px 0}
		.layer-wrap.cerfity .enter{font-size:14px; padding:10px 15px;}

	}
	@media only screen and (max-width:380px) {
	}
`
,{ parseMediaQueries: true }
);
