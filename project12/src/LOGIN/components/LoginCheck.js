import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setValue } from '../../REDUX/actions';
import { Actions } from 'react-native-router-flux';

class LoginCheck extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    _LoginCheck = () => {
        console.log("LoginCheck USER : ",USER);
        //this.props.onSetValue(USER);
    };
}



// let mapDispatchToProps = (dispatch) => {
//     return {
//         onSetValue: (value) => dispatch(setValue(value))
//     }
// }

// LoginCheck = connect(undefined, mapDispatchToProps)(LoginCheck);
export default LoginCheck;
