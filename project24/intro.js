import transform from "css-to-react-native-transform";

export const intro = transform(`
@charset "utf-8";
body.intro{position:relative; }
.intro .img{text-align:center; padding:32vw 0 30vw 0; }
.intro .img img{width:36%; max-width:221px;}
.intro .version{text-align:center; color:#1e1e32;line-height:1em;font-size:2vw; padding:20px 0 20px 0; font-weight:300; }
	@media only screen and (max-width:999px) {
		.intro .version{font-size:19px; position:fixed; left:0; bottom:0; width:100%;}
	}
	@media only screen and (max-width:680px) {
		.intro .version{font-size:17px;}
	}
	@media only screen and (max-width:480px) {
		.intro .img{padding:150px 0 120px 0}
		
	}
	@media only screen and (max-width:380px) {
		.intro .version{font-size:13px;}
	}



.inst-wrap{position:relative; padding-bottom:50px;}
.inst-wrap .item{position:relative; }
.inst-wrap .item .img img{width:100%}
.inst-wrap .item .txt{ text-align:center; margin-top:5vw}
.inst-wrap .item .txt .btxt{ color:#28a0f5; font-weight:900; letter-spacing:-0.02em;line-height:1.2em; font-size:2.4vw;}
.inst-wrap .item .txt .stxt{ color:#1e1e32; font-weight:400; letter-spacing:-0.045em; line-height:1.5em; margin-top:2vw; font-size:2vw;}
.inst-wrap .slick-dots{margin-top:2vw;position:relative; left:auto; bottom:auto; right:auto; top:auto;display:block; text-align:center; font-size:0;}
.inst-wrap .slick-dots li{width:24px; height:24px; padding:0; display:inline-block; margin:0 8px;vertical-align:top;}
.inst-wrap .slick-dots li button{width:24px; height:24px; text-indent:-9999px;  background:#d6f1ff ;box-sizing:border-box; padding:0; border-radius:100%;display:inline-block; vertical-align:top}
.inst-wrap .slick-dots li.slick-active button{background:#28c8f5;}

.inst-wrap .dots{margin-top:2vw;position:relative; left:auto; bottom:auto; right:auto; top:auto;display:block; text-align:center; font-size:0;}
.inst-wrap .dots li{width:24px; height:24px; padding:0; display:inline-block; margin:0 8px;vertical-align:top;}
.inst-wrap .dots li a{border:none;width:24px; height:24px; text-indent:-9999px;  background:#d6f1ff ;box-sizing:border-box; padding:0; border-radius:100%;display:inline-block; vertical-align:top}
.inst-wrap .dots li.active a{background:#28c8f5;}
	
	
	@media only screen and (max-width:999px) {
		.inst-wrap{}
		.inst-wrap .item .txt{margin-top:35px;}
		.inst-wrap .item .txt .btxt{font-size:21px;}
		.inst-wrap .item .txt .stxt{font-size:19px; margin-top:25px;}
		
		.inst-wrap .slick-dots{height:20px; margin-top:20px;}
		.inst-wrap .slick-dots li{width:20px;height:20px;margin:0 5px;}
		.inst-wrap .slick-dots li button{width:20px; height:20px;}

		.inst-wrap .dots{height:20px; margin-top:20px;}
		.inst-wrap .dots li{width:20px;height:20px;margin:0 5px;}
		.inst-wrap .dots li a{width:20px; height:20px;}
	}
	@media only screen and (max-width:680px) {
		.inst-wrap{}
		.inst-wrap .item .txt .btxt{font-size:19px;}
		.inst-wrap .item .txt .stxt{font-size:17px; margin-top:20px;}

		.inst-wrap .slick-dots{height:16px;}
		.inst-wrap .slick-dots li{width:16px;height:16px;}
		.inst-wrap .slick-dots li button{width:16px; height:16px;}

		.inst-wrap .dots{height:16px;}
		.inst-wrap .dots li{width:16px;height:16px;}
		.inst-wrap .dots li a{width:16px; height:16px;}
	}
	@media only screen and (max-width:480px) {
		.inst-wrap .item .txt{margin-top:25px;}
		.inst-wrap .item .txt .btxt{font-size:17px;}
		.inst-wrap .item .txt .stxt{font-size:14px; margin-top:17px;}

		.inst-wrap .slick-dots{height:12px;}
		.inst-wrap .slick-dots li{width:12px;height:12px;margin:0 3px;}
		.inst-wrap .slick-dots li button{width:12px; height:12px;}

		.inst-wrap .dots{height:12px;}
		.inst-wrap .dots li{width:12px;height:12px;margin:0 3px;}
		.inst-wrap .dots li a{width:12px; height:12px;}
	}
	@media only screen and (max-width:380px) {
		.inst-wrap{ }
		.inst-wrap .item .txt .btxt{font-size:17px;}
		.inst-wrap .item .txt .stxt{font-size:13px;}
		
	}
	@media only screen and (max-width:340px) {
		
		.inst-wrap .item .txt{margin-top:25px;}
    }
    `
,{ parseMediaQueries: true }
);
