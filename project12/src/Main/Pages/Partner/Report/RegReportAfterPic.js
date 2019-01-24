import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceImage from '~/Main/Components/AfterServiceImage';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class RegReportAfterPic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        btnDisabled : true
      };
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 조치 후"
            >
                <AfterServiceImage
                    beforeAction={ false }
                />
                <AfterServiceImage
                    beforeAction={ false }
                />
                <AfterServiceImage
                    beforeAction={ false }
                />

                <CustomButton 
                    //disabled={ this.state.btnDisabled }
                    onPress={ () => alert("다음") }>
                    <Text>다음</Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default RegReportAfterPic;