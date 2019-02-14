import transform from "css-to-react-native-transform";

export const styleDefault = transform(`
@charset "utf-8";
.owl-item {float:left;}
.owl-carousel .owl-wrapper {display: none;position:relative;-webkit-transform:translate3d(0px, 0px, 0px);-webkit-transition: all 0.3s ease-out;-moz-transition: all 0.3s ease-out;-o-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}

i,em{font-style:normal}
.ov{overflow:hidden}
.hide{display:none;}

.break{display:block;} 
.plump{}	
.block{display:block}
	@media all and (max-width:480px) {
		.plump{display:block}
		.block{display:block}
	}
	@media all and (max-width:1000px) {
		.m-none{display:none}
		.break{display:inline}

	}

/* line */
.bd-line{height:1px; background:#ccc; margin:15px 0}
.u-line{height:1px;background:#ccc;  position:Relative;}
.u-line:after{position:Absolute; background:#ebebeb; left:50%;margin-left:-1000px;width:2000px;height:100%; display:block; content:""}


.btn-wrap{position:relative; z-index:9;}


/* input & select */
.chk-input {display:inline-block; vertical-align:top; position:relative;background:#fff; }
.chk-input input[type="text"], .chk-input input[type="password"]{height:70px; letter-spacing:-0.035em;border:none;background:none; color:#b4b4b4;padding:0 17px; font-size:21px; box-sizing:border-box; display:block; width:100%; position:relative; z-index:54;-webkit-transition: all 0.3s ease-out;-moz-transition: all 0.3s ease-out;-o-transition: all 0.3s ease-out;transition: all 0.3s ease-out}
.chk-input.active input[type="text"], .chk-input.active input[type="password"]{color:#666;font-weight:400 !important}
.chk-input input[type="text"]:focus, .chk-input input[type="password"]:focus{ color:#666 !important}
	@media all and (max-width:999px) {
		.chk-input input[type="text"], .chk-input input[type="password"]{height:60px;padding:0 15px; font-size:18px; }
	}
	@media all and (max-width:680px) {
		.chk-input input[type="text"], .chk-input input[type="password"]{height:50px;padding:0 12px; font-size:16px; }
	}
	@media all and (max-width:480px) {
		.chk-input input[type="text"], .chk-input input[type="password"]{height:42px;padding:0 10px; font-size:14px; }
	}
	@media all and (max-width:380px) {
		.chk-input input[type="text"], .chk-input input[type="password"]{ font-size:13px; }
	}


.chk-check {display:inline-block; vertical-align:top;color:#000; position:Relative;}
.chk-check input[type="checkbox"] {display:none;}
.chk-check input[type="checkbox"] + label{display:block;position: relative; padding-left:37px; font-weight:400;font-size:21px; color:#fff; line-height:26px; letter-spacing:-0.03em; cursor:pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }
.chk-check input[type="checkbox"] + label:before { content:''; position: absolute; left:0px; top:0; width:25px;height:25px;box-sizing:border-box;text-align:center; background:#fff;  }
.chk-check input[type="checkbox"]:checked + label{color:#fff; }
.chk-check input[type="checkbox"]:checked + label:before {background:url(../_Img/Sub/check-on.jpg) no-repeat center center #fff; background-size:60% auto;}

.chk-check.black input[type="checkbox"] + label{color:rgba(30,30,50,0.6)}
.chk-check.black input[type="checkbox"] + label:before{border:1px solid rgba(30,30,50,0.6)}
.chk-check.black input[type="checkbox"]:checked + label:before{background:url(../_Img/Sub/check-on2.png) no-repeat center center;background-size:70% auto;}

	@media all and (max-width:999px) {
		.chk-check input[type="checkbox"] + label{font-size:19px; padding-left:30px; line-height:22px;}
		.chk-check input[type="checkbox"] + label:before{width:22px;height:22px; top:-1px;}
	}
	@media all and (max-width:680px) {
		.chk-check input[type="checkbox"] + label{font-size:17px; padding-left:27px; line-height:18px;}
		.chk-check input[type="checkbox"] + label:before{width:18px;height:18px;}
	}
	@media all and (max-width:480px) {
		.chk-check input[type="checkbox"] + label{font-size:14px; padding-left:20px; line-height:15px;}
		.chk-check input[type="checkbox"] + label:before{width:15px;height:15px;}
	}
	@media all and (max-width:380px) {
		.chk-check input[type="checkbox"] + label{font-size:13px; padding-left:19px; line-height:14px;}
		.chk-check input[type="checkbox"] + label:before{width:14px;height:14px;}
	}



.chk-radio {display:inline-block; vertical-align:top;color:#000; position:Relative;}
.chk-radio input[type="radio"]{display:none;}
.chk-radio input[type="radio"] + label{display: inline-block; vertical-align:top;position: relative; padding-left:2.5vw; font-weight:600 ; font-size:2vw; color:#999; line-height:1em; letter-spacing:-0.05em; cursor:pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }
.chk-radio input[type="radio"] + label:before { content:''; position: absolute; left:0px; top:1px; width:2vw;height:2vw;box-sizing:border-box;text-align:center;border-radius:100%; background:#fff; border:1px solid #999; }
.chk-radio input[type="radio"]:checked + label{color:#393939; font-weight:600 }
.chk-radio input[type="radio"]:checked + label:before {border-color:#00bce8}
.chk-radio input[type="radio"]:checked + label:after {background:#00bce8; border-radius:100%; width:1vw; height:1vw; display:block; content:""; position:Absolute; left:0.5vw; top:0.58vw}
	@media all and (max-width:999px) {
		.chk-radio input[type="radio"] + label{font-size:19px; padding-left:25px; line-height:20px;}
		.chk-radio input[type="radio"] + label:before{width:20px;height:20px;}
		.chk-radio input[type="radio"]:checked + label:after{width:10px;height:10px; left:5px; top:6px;}
	}
	@media all and (max-width:680px) {
		.chk-radio input[type="radio"] + label{font-size:17px; padding-left:25px; line-height:17px;}
		.chk-radio input[type="radio"] + label:before{width:16px;height:16px;}
		.chk-radio input[type="radio"]:checked + label:after{width:8px;height:8px; left:4px; top:5px;}
	}
	@media all and (max-width:480px) {
		.chk-radio input[type="radio"] + label{font-size:15px; padding-left:25px; line-height:16px;}
		.chk-radio input[type="radio"] + label:before{top:-1px}
		.chk-radio input[type="radio"]:checked + label:after{ top:3px;}
	}


.select-box{position:relative; background:#fff; box-sizing:border-box;display:inline-block;vertical-align:top}
.select-box:after{background:url(../_Img/Sub/faq-down.png) no-repeat center center; background-size:20px auto; position:absolute; width:20px; height:20px; position:absolute; right:10px; top:50%;margin-top:-10px; display:block; content:""; z-index:3}
.select-box select{padding:0 15px;font-size:13px; border:none;border-bottom:1px solid #e6e6e6; font-size:21px;height:70px;color:#c6c6c6; -webkit-appearance:none; -moz-appearance:none;background:none; appearance:none;width:100%; margin:0;  position:relative; z-index:5; cursor:pointer;-webkit-transition: all 0.3s ease-out;-moz-transition: all 0.3s ease-out;-o-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}
.select-box select::-ms-expand{display:none;}
.select-box.active select,.select-box.active select{color:#666;}
	@media all and (max-width:999px) {
		.select-box select{padding:0 15px; height:60px;font-size:17px;}
		.select-box:after{background-size:14px auto; width:14px;height:14px; margin-top:-7px; top:50%; right:10px;}
	}
	@media all and (max-width:680px) {
		.select-box select{padding:0 10px; font-size:16px; height:50px;}
		.select-box:after{background-size:14px auto; width:14px;height:14px; margin-top:-7px; top:50%; right:10px;}
	}
	@media all and (max-width:480px) {
		.select-box select{padding:0 5px; height:40px; font-size:14px;}
		.select-box:after{background-size:12px auto; width:10px;height:10px; margin-top:-5px; top:50%; right:7px;}
	}




/* btn-type */
.bl-btn{display:block;background:#28c8f5;box-sizing:border-box; line-height:65px; color:#fff;text-align:center; font-size:21px; font-weight:500;}
.bg-btn{display:block;background:#eee;box-sizing:border-box; line-height:65px; color:#222;text-align:center; font-size:21px; font-weight:500;}
.bb-btn{display:block;background:#444;box-sizing:border-box; line-height:65px; color:#fff;text-align:center; font-size:21px; font-weight:500;}
.bw-btn{display:block;border:2px solid #28c8f5;box-sizing:border-box; line-height:61px; color:#28c8f5;text-align:center; font-size:21px; font-weight:500;}
	
	@media only screen and (max-width:999px) {
		.bl-btn{font-size:19px;line-height:54px}
		.bg-btn{font-size:19px;line-height:54px}
		.bb-btn{font-size:19px;line-height:54px}
		.bw-btn{font-size:19px;line-height:50px}
	}
	@media only screen and (max-width:680px) {
		.bl-btn{font-size:17px;line-height:48px}
		.bg-btn{font-size:17px;line-height:48px}
		.bb-btn{font-size:17px;line-height:48px}
		.bw-btn{font-size:17px;line-height:44px}
	}
	@media only screen and (max-width:480px) {
		.bl-btn{font-size:15px;line-height:44px}
		.bg-btn{font-size:15px;line-height:44px}
		.bb-btn{font-size:15px;line-height:44px}
		.bw-btn{font-size:15px;line-height:40px}
	}
`
,{ parseMediaQueries: true }
);
