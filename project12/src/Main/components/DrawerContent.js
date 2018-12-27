import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../Common/Components/CustomButton';

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  _goPage = () => {
    Actions.replace("MainStack1");
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={Actions.MainStack}>
          <Text>
            Main
          </Text>
        </Button>
        <Button onPress={Actions.tab_1}>
          <Text>
            Switch to tab1
          </Text>
        </Button>
        <Button onPress={Actions.tab_2}>
          <Text>
            Switch to tab2
          </Text>
        </Button>
        <Button onPress={Actions.MainStack1}>
          <Text>
         test1
          </Text>
        </Button>
        <Button onPress={Actions.MainStack2}>
          <Text>
         test2
          </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});

export default DrawerContent;
