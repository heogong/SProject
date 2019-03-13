import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native'

const propTypes = {
  focused: PropTypes.bool
};

const defaultProps = {
  focused: false
};

const TabIcon = props => <Image source={props.iconImg} resizeMode="contain" style={{height: "90%"}}/>;

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;
 