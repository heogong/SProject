import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../Common/Components/Button';

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={Actions.pop}>
          <Text>
            Back
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
        <Button onPress={Actions.echo}>
          <Text>
          Push Clone Scene (EchoView)
          </Text>
        </Button>
        <Button onPress={Actions.launch}>
          <Text>
          Reset back to launch
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
