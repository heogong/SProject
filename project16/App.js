/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import BackgroundJob from 'react-native-background-job';

const regularJobKey = "regularJobKey";

// const backgroundJob = {
//   jobKey: "myJob1",
//   job: () => console.log("Running in background")
// };

// BackgroundJob.register(backgroundJob);


BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => console.log(`Background Job fired!. Key = ${regularJobKey}`)
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>
          Scheduled jobs:
          {this.state.jobs.map(({ jobKey }) => jobKey)}
        </Text>
       <TouchableHighlight
          style={styles.button}
          onPress={() => {
            BackgroundJob.schedule({
              jobKey: regularJobKey,
              notificationTitle: "Notification title",
              notificationText: "Notification text",
              period: 1500
            });
          }}
        >
          <Text>Schedule regular job</Text>
        </TouchableHighlight>

         <TouchableHighlight
          onPress={() => {
            BackgroundJob.cancel({ jobKey: regularJobKey });
          }}
        >
          <Text>Cancel regular job</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
