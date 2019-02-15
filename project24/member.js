import { StyleSheet } from 'react-native';
import transform from "css-to-react-native-transform";

export const member = transform(`
@charset "utf-8";
	.memberWrapSelect{padding: 25px 15px;}
	.memberWrapsSelectLogo{padding:100px 0 60px 0;}
	.memberWrapsSelectLogoImg{width: 36%; max-width: 221px; height: 100px;}
`
,{ parseMediaQueries: true }
);

// export const member = StyleSheet.create({
// 	styleObject
// });