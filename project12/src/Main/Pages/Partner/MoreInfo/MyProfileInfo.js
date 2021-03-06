import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Text, Item, Input } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomEtcButton from '~/Common/Components/CustomEtcButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';

class MyProfileInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
      data: [],
			isAlertModal: false, // alert 용
			resultMsg: null // alert 용
		};
	}

	componentDidMount() {
		this._getUserInfo();
	}

	//  사용자 정보 가져오기
	_getUserInfo = () => {
		GetUserInfo().then(async (result) => {
			GetCommonData(result, this._getUserInfo).then(async (resultData) => {
				if (resultData !== undefined) {
					console.log(resultData);
					const ResultBool = (await (resultData.resultCode == SUCCESS_RETURN_CODE)) ? true : false; // API 결과 여부 확인

					if (ResultBool) {
						this.setState({ data: resultData.data });
					} else {
						this.setState({
							isAlertModal: true,
							resultMsg: resultData.resultMsg
						});
					}
				}
			});
		});
	};

	// 로그아웃
	_logOut = async () => {
		try {
			await AsyncStorage.removeItem('AccessToken');
			await AsyncStorage.removeItem('RefreshToken');
			await Actions.IntroPage();
		} catch (exception) {
			return false;
		}
	};

	render() {
		return (
			<Container style={styles.containerInnerPd}>
				<CustomHeader title="내정보 수정" />

				<View style={styles.contentWrap}>
					<View style={styles.fx1}>
						<Text style={styles.inputNbTitleTxt}>이메일</Text>
						<Item regular style={styles.inputNbWhBackGreyBottomBo}>
							<Image source={require('~/Common/Image/intro-logo.png')} style={localStyles.inputIcon} />
							<Input
								value={
									this.state.data.snsSignupYn == 'N' ? (
										this.state.data.usrId // SNS 가입자가 아니면
									) : this.state.data.snsSiteCd == 'SNS_SITE_CD_01' ? (
										'네이버로 로그인 하셨습니다.'
									) : (
										'카카오로 로그인 하셨습니다.'
									)
								}
								style={styles.inputNbDefaultBox}
								editable={false}
								selectTextOnFocus={false}
							/>
						</Item>

						{// SNS 가입자는 비밀번호 변경 기능 제거
						this.state.data.snsSignupYn == 'N' ? (
							// SNS 가입자가 아니면
							<View>
								<Text style={styles.inputNbTitleTxt}>비밀번호</Text>
								<Item regular style={styles.inputNbWhBackGreyBottomBo}>
									<Input
										value="1234"
										style={styles.inputNbDefaultBox}
										editable={false}
										selectTextOnFocus={false}
										secureTextEntry={true}
									/>

									<CustomEtcButton
										onPress={Actions.MyProfileModPassword1}
										SmallBtn={true}
										customStyle={{ width: 80, marginTop: 10 }}
									>
										변경
									</CustomEtcButton>
								</Item>
							</View>
						) : (
							<View />
						)}

						<Text style={styles.inputNbTitleTxt}>이름</Text>

						<Item regular style={styles.inputNbWhBackGreyBottomBo}>
							<Input
								value={this.state.data.usrNm}
								style={styles.inputNbDefaultBox}
								editable={false}
								selectTextOnFocus={false}
							/>

							<CustomEtcButton
								onPress={() => Actions.MyProfileModName({ refreshAction: this._getUserInfo })}
								SmallBtn={true}
								customStyle={{ width: 80, marginTop: 10 }}
							>
								변경
							</CustomEtcButton>
						</Item>

						<Text style={styles.inputNbTitleTxt} />
						<Item regular style={styles.inputNbWhBackGreyBottomBo}>
							<Input
								value={this.state.data.usrPhoneNum}
								style={styles.inputNbDefaultBox}
								editable={false}
								selectTextOnFocus={false}
							/>

							<CustomEtcButton
								onPress={() => Actions.MyProfileModPhone({ refreshAction: this._getUserInfo })}
								SmallBtn={true}
								customStyle={{ width: 80, marginTop: 10 }}
							>
								변경
							</CustomEtcButton>
						</Item>

						<View style={styles.fxDirRow}>
							<Text style={[ styles.inputNbTitleTxt, { color: '#626270' } ]}>회원 탈퇴하시려면 </Text>
							<TouchableOpacity onPress={Actions.MyProfileExit1}>
								<Text
									style={[
										styles.inputNbTitleTxt,
										{ color: '#626270', textDecorationLine: 'underline' }
									]}
								>
									여기
								</Text>
							</TouchableOpacity>
							<Text style={[ styles.inputNbTitleTxt, { color: '#626270' } ]}>를 눌려주세요.</Text>
						</View>
					</View>
					{/* 
          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._logOut }
            >
              로그아웃
            </CustomButton>
          </View> */}
				</View>

				{/* alert 메세지 모달 */}
				<CustomModal
					modalType="ALERT"
					isVisible={this.state.isAlertModal}
					onPress={() => this.setState({ isAlertModal: false })}
					infoText={this.state.resultMsg}
					btnText="확인"
				/>
			</Container>
		);
	}
}

const localStyles = StyleSheet.create({
	inputIcon: {
		paddingLeft: 0,
		marginRight: 6,
		width: 24,
		height: 24
	}
});

export default MyProfileInfo;
