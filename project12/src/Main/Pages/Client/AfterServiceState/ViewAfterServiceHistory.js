import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Text } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';

import GetAfterServiceReport from '~/Main/Functions/GetAfterServiceReport';
import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';
import RegEvalPoint from '~/Main/Functions/RegEvalPoint';
import AfterServiceImage from '~/Main/Components/AfterServiceImage';

import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import CustomEtcButton from '~/Common/Components/CustomEtcButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

const AFTER_SERVICE_IMG_CNT = 4;
const STAR_POINT = [ 1, 2, 3, 4, 5 ];
let EVAL_POINT = 0;

class ViewAfterServiceHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				asPrgsMst: {
					asPrgsStatNm: null,
					asPrgsStatDSC: null,
					asRecvDsc: null
				},
				clinePrdInfo: {
					bplace: {
						bplaceNm: null,
						addr: {
							addressName: null
						},
						road: {
							addressName: null
						},
						detail: {
							detailAddr1: null
						}
					},
					prdType: {
						prdTypeKoNm: null
					},
					clientPrdNm: null,
					prdTypeImg: {
						fileUrl: null
					}
				},
				clientPrdParts: []
			},
			beforeData: {
				images: [],
				info: {
					asCauseDsc: null
				}
			},
			afterData: {
				images: [],
				info: {
					asActionDsc: null
				}
			},
			star1: false,
			star2: false,
			star3: false,
			star4: false,
			star5: false,
			disableBtn: true,
			isModalVisible: false,
			isAlertModal: false, // alert 용
			resultMsg: null // alert 용
		};
	}

	componentDidMount() {
		this._getAfterServiceReport();
		this._getBeforeActionInfo();
		this._getAfterActionInfo();
	}

	// AS 보고서 신청내역, 결제정보 조회
	_getAfterServiceReport = () => {
		GetAfterServiceReport(this.props.asPrgsId).then((result) => {
			GetCommonData(result, this._getAfterServiceReport).then(async (resultData) => {
				if (resultData !== undefined) {
					const ResultBool = (await (resultData.resultCode == SUCCESS_RETURN_CODE)) ? true : false; // API 결과 여부 확인
					console.log('신청내역, 결제정보 조회 -', resultData);
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

	// AS 보고서 조치전 정보 조회
	_getBeforeActionInfo = () => {
		GetAfterServiceActionInfo(true, this.props.asPrgsId).then((result) => {
			GetCommonData(result, this._getBeforeActionInfo).then(async (resultData) => {
				if (resultData !== undefined) {
					const ResultBool = (await (resultData.resultCode == SUCCESS_RETURN_CODE)) ? true : false; // API 결과 여부 확인
					console.log('조치전 정보 조회 - ', resultData);
					if (ResultBool) {
						this.setState({ beforeData: resultData.data });
						// BEFORE_DATA = resultData.data;
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

	// AS 보고서 조치후 정보 조회
	_getAfterActionInfo = () => {
		GetAfterServiceActionInfo(false, this.props.asPrgsId).then((result) => {
			GetCommonData(result, this._getAfterActionInfo).then(async (resultData) => {
				if (resultData !== undefined) {
					const ResultBool = (await (resultData.resultCode == SUCCESS_RETURN_CODE)) ? true : false; // API 결과 여부 확인
					console.log('조치후 정보 조회 - ', resultData);
					if (ResultBool) {
						this.setState({ afterData: resultData.data });
						// AFTER_DATA = resultData.data;
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

	//  AS 평가 정보 등록 - 테스트 asPrgsId 필요
	_regEvalPoint = () => {
		RegEvalPoint(this.props.asPrgsId, EVAL_POINT).then(async (result) => {
			GetCommonData(result, this._regEvalPoint).then(async (resultData) => {
				if (resultData !== undefined) {
					const ResultBool = (await (resultData.resultCode == SUCCESS_RETURN_CODE)) ? true : false; // API 결과 여부 확인
					console.log(resultData);

					if (ResultBool) {
						this.setState({
							isModalVisible: false,
							isAlertModal: true,
							resultMsg: resultData.resultMsg
						});
					} else {
						this.setState({
							isModalVisible: false,
							isAlertModal: true,
							resultMsg: resultData.resultMsg,
							star1: false,
							star2: false,
							star3: false,
							star4: false,
							star5: false
						});
					}
				}
			});
		});
	};

	_drawBeforeImg = () => {
		let beforeImgArray = [];
		const { beforeData } = this.state;
		let beforeImgCnt = beforeData.images.length;

		for (let i = 0; i < AFTER_SERVICE_IMG_CNT; i++) {
			if (beforeImgCnt > 0) {
				beforeImgArray.push(
					<AfterServiceImage key={i} viewImage={true} imgUri={beforeData.images[i].fileUrl} imgSizeType={1} />
				);
				beforeImgCnt--;
			} else {
				beforeImgArray.push(<AfterServiceImage key={i} viewImage={true} imgUri={null} imgSizeType={1} />);
			}
		}

		return beforeImgArray;
	};

	_drawAfterImg = () => {
		let afterImgArray = [];
		const { afterData } = this.state;
		let afterImgCnt = afterData.images.length;

		for (let i = 0; i < AFTER_SERVICE_IMG_CNT; i++) {
			if (afterImgCnt > 0) {
				afterImgArray.push(
					<AfterServiceImage key={i} viewImage={true} imgUri={afterData.images[i].fileUrl} imgSizeType={1} />
				);
				afterImgCnt--;
			} else {
				afterImgArray.push(<AfterServiceImage key={i} viewImage={true} imgUri={null} imgSizeType={1} />);
			}
		}

		return afterImgArray;
	};

	_goPaymentAddAfterService = () => {
		// 추가 AS 결제로 이동
		Actions.AfterServiceAddPayment({
			asPrgsMst: this.state.data.asPrgsMst
		});
	};

	// 별점 클릭 호출
	_clickStar = (clickPoint) => {
		EVAL_POINT = clickPoint;

		STAR_POINT.map((point) => {
			this.setState({
				['star' + point]: point <= clickPoint ? true : false
			});
		});

		this.setState({ disableBtn: false });
	};

	// 뒤로가면서 리스트 리플레쉬
	_goActions = () => {
		this.props.refreshActions();
		Actions.pop();
	};

	render() {
		return (
			<Container style={styles.container}>
				<View
					style={{
						paddingLeft: styles.containerScroll.paddingLeft,
						paddingRight: styles.containerScroll.paddingRight
					}}
				>
					<CustomHeader title="A/S 보고서" customAction={this._goActions} />
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={localStyles.contentWrap}>
						<View style={localStyles.titleWrap}>
							<Image
								source={{ uri: this.props.prdTypeFileUrl ? this.props.prdTypeFileUrl : 'insert404' }}
								style={localStyles.titleImg}
							/>
							<Text style={localStyles.titleNameTxt}>{this.state.data.clinePrdInfo.bplace.bplaceNm}</Text>
							<Text style={localStyles.subNameTxt}>
								{this.state.data.clinePrdInfo.prdType.prdTypeKoNm}
							</Text>
						</View>

						<View style={[ styles.boxShadow, localStyles.histBoxWrap ]}>
							<Text style={localStyles.histBoxTitleTxt}>A/S신청내역</Text>

							<Text style={localStyles.histBoxSubTitleTxt}>
								{this.state.data.clinePrdInfo.clientPrdNm}
							</Text>
							<Text style={localStyles.histBoxInfoTxt}>
								{
									this.state.data.clinePrdInfo.bplace.road == "" && this.state.data.clinePrdInfo.bplace.road == null 
									? this.state.data.clinePrdInfo.bplace.addr.addressName
									: this.state.data.clinePrdInfo.bplace.road.addressName
								} {this.state.data.clinePrdInfo.bplace.detail.detailAddr1}
							</Text>

							<Text style={localStyles.histBoxSubTitleTxt}>참고사항</Text>
							<Text style={localStyles.histBoxInfoTxt}>
								{this.state.data.asPrgsMst.asRecvDsc == 'null' ? (
									'입력된 내용이 없습니다.'
								) : (
									this.state.data.asPrgsMst.asRecvDsc
								)}
							</Text>

							{this.state.data.clientPrdParts.length > 0 ? (
								<View>
									<Text style={localStyles.histBoxSubTitleTxt}>쿨리닉 제품분석</Text>
									<View style={[ styles.fxDirRow, { flexWrap: 'wrap' } ]}>
										{this.state.data.clientPrdParts.map((info, idx) => (

											<View key={idx} style={{ width: '50%' }}>
												<Text style={localStyles.histBoxInfoTxt} numberOfLines={1}>
													{info.rootPrdPartKoNm} : {info.prdPartKoNm}
												</Text>
											</View>
											
										))}
									</View>
								</View>
							) : (
								<View />
							)}

							{this.state.data.asPrgsMst.evalYn == 'N' ? (
								<CustomButton
									onPress={() => this.setState({ isModalVisible: true })}
									DefaultLineBtn={true}
									CustomBtnStyle={{ height: 40, marginTop: 15, marginBottom: 0 }}
									CustomFontStyle={{ fontSize: 14 }}
								>
									서비스평가 하러 가기
								</CustomButton>
							) : (
								<View />
							)}
						</View>

						{this.state.data.asPrgsMst.asAddYn == 'Y' ? (
							<View>
								<View style={[ localStyles.boxTitleWrap ]}>
									<Text style={localStyles.boxTitleTxt}>추가 A/S</Text>
									<View style={[ styles.line, { flex: 2, borderColor: color.whiteColor } ]} />
								</View>
								<View style={[ styles.boxShadow, localStyles.histBoxWrap ]}>
									<Text style={localStyles.histBoxTitleTxt}>청구비용</Text>

									<Text style={[ localStyles.histBoxSubTitleTxt, { marginTop: 0 } ]}>추가 A/S 내역</Text>
									<Text style={localStyles.histBoxInfoTxt}>
										{this.state.data.asPrgsMst.asAddTitle}
									</Text>

									<Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 사유</Text>
									<Text style={localStyles.histBoxInfoTxt}>
										{this.state.data.asPrgsMst.asAddComment}
									</Text>

									<Text style={localStyles.histBoxSubTitleTxt}>
										추가 A/S 비용({this.state.data.asPrgsMst.asAddStatNm})
									</Text>

									<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text style={localStyles.histBoxInfoTxt}>결제금액</Text>
										<Text style={[ localStyles.histBoxInfoTxt, { color: color.defaultColor } ]}>
											￦{this.state.data.asPrgsMst.totalAmount}
										</Text>
									</View>

									{this.state.data.asPrgsMst.asAddStatCd == 'AS_ADD_STAT_CD_02' ? (
										<View />
									) : (
										<CustomButton
											onPress={this._goPaymentAddAfterService}
											DefaultLineBtn={true}
											CustomBtnStyle={{ height: 40, marginTop: 15, marginBottom: 0 }}
											CustomFontStyle={{ fontSize: 14 }}
										>
											결제 하러 가기
										</CustomButton>
									)}
								</View>
							</View>
						) : (
							<View />
						)}

						<View>
							<View>
								<View style={[ localStyles.boxTitleWrap ]}>
									<Text style={localStyles.boxTitleTxt}>A/S 조치 전</Text>
									<View style={[ styles.line, { flex: 2, borderColor: color.whiteColor } ]} />
								</View>

								<View style={[ styles.boxShadow, { backgroundColor: color.whiteColor } ]}>
									<View style={localStyles.prdPhotoWrap}>{this._drawBeforeImg()}</View>
									<View style={localStyles.prdPhotoTxtWrap}>
										<Text style={localStyles.histBoxSubTitleTxt}>출장 전 상태</Text>
										<Text style={localStyles.histBoxInfoTxt}>
											{this.state.beforeData.info !== null ? (
												this.state.beforeData.info.asCauseDsc
											) : (
												'입력된 내용이 없습니다.'
											)}
										</Text>
									</View>
								</View>
							</View>

							<View>
								<View style={[ localStyles.boxTitleWrap ]}>
									<Text style={localStyles.boxTitleTxt}>A/S 조치 후</Text>
									<View style={[ styles.line, { flex: 2, borderColor: color.whiteColor } ]} />
								</View>

								<View style={[ styles.boxShadow, { backgroundColor: color.whiteColor } ]}>
									<View style={localStyles.prdPhotoWrap}>{this._drawAfterImg()}</View>
									<View style={localStyles.prdPhotoTxtWrap}>
										<Text style={localStyles.histBoxSubTitleTxt}>A/S 조치내역</Text>
										<Text style={localStyles.histBoxInfoTxt}>
											{this.state.afterData.info !== null ? (
												this.state.afterData.info.asActionDsc
											) : (
												'입력된 내용이 없습니다.'
											)}
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>

				<Modal
					isVisible={this.state.isModalVisible}
					onBackdropPress={() => this.setState({ isModalVisible: false })}
				>
					<View style={[ styles.modalWrap, { height: 150 } ]}>
						<View style={styles.modalContent}>
							<View style={[ styles.modalTop2LTxtWrap, { flex: 2 } ]}>
								<Text style={styles.modalTopTxt}>A/S업체의 서비스를 평가해주세요!</Text>
								<View style={[ styles.fxDirRow, styles.justiConCenter ]}>
									{STAR_POINT.map((point, idx) => (
										<TouchableOpacity key={idx} onPress={() => this._clickStar(point)}>
											<Image
												source={
													this.state['star' + point] ? (
														require('~/Common/Image/Big_bluestar_icon.png')
													) : (
														require('~/Common/Image/Big_graystar_icon.png')
													)
												}
												resizeMode="contain"
												style={localStyles.starIconImg}
											/>
										</TouchableOpacity>
									))}
								</View>
							</View>
							<View style={[ styles.modalBtnWrap, styles.mb5 ]}>
								<CustomEtcButton disabled={this.state.disableBtn} onPress={this._regEvalPoint}>
									평가완료!
								</CustomEtcButton>
							</View>
						</View>
					</View>
				</Modal>

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
	titleWrap: {
		alignItems: 'center'
	},
	titleImg: {
		width: 80,
		height: 80,
		marginTop: -40
	},
	boxTitleWrap: {
		marginBottom: 20,
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 25
	},
	boxTitleTxt: {
		flex: 1,
		fontSize: 18,
		color: color.whiteColor,
		fontWeight: 'bold'
	},
	prdPhotoWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		backgroundColor: color.whiteColor,
		width: '100%'
	},
	photoNoBox: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: color.whiteColor
	},
	contentWrap: {
		paddingLeft: 26,
		paddingRight: 26,
		marginTop: 40,
		paddingBottom: 26,
		backgroundColor: color.defaultColor
	},
	titleNameTxt: {
		marginTop: 14,
		fontSize: 18,
		fontWeight: 'bold',
		color: color.whiteColor
	},
	subNameTxt: {
		marginTop: 7,
		marginBottom: 30,
		fontSize: 14,
		fontWeight: 'bold',
		color: color.whiteColor
	},
	histBoxWrap: {
		backgroundColor: color.whiteColor,
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft: 24,
		paddingRight: 24
	},
	histBoxTitleTxt: {
		color: '#28c8f5',
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 6
	},
	histBoxSubTitleTxt: {
		fontSize: 15,
		color: '#1e1e32',
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 20
	},
	histBoxInfoTxt: {
		fontSize: 13,
		color: '#8e8e98',
		lineHeight: 20
	},
	prdPhotoTxtWrap: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		borderTopWidth: 1,
		borderColor: '#c9cacb'
	},
	starIconImg: {
		width: 32,
		height: 32,
		marginLeft: 2,
		marginRight: 2
	},
	starIconWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10
	}
});

export default ViewAfterServiceHistory;
