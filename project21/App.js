import React, {Component} from 'react';
import {Alert, Button, Platform, StyleSheet, Text, View} from 'react-native';

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      locations: [],
      stationaries: [],
      isRunning: true
    };
    
  }
  componentDidMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 500,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 120000,
      fastestInterval: 120000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar' // you can also add your own properties
      }
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log(location);

      var currentDate = new Date();

      var msg = "현재 시간:"+currentDate.getHours()+"시"
      msg += currentDate.getMinutes()+"분";
      msg += currentDate.getSeconds()+"초";
      console.log(msg);


      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    // BackgroundGeolocation.on('stationary', (stationaryLocation) => {
    //   // handle stationary locations here
    //   Actions.sendLocation(stationaryLocation);
    // });

    // BackgroundGeolocation.on('error', (error) => {
    //   console.log('[ERROR] BackgroundGeolocation error:', error);
    // });

    // BackgroundGeolocation.on('start', () => {
    //   console.log('[INFO] BackgroundGeolocation service has been started');
    //   this.setState({ isRunning: true });
    // });

    // BackgroundGeolocation.on('stop', () => {
    //   console.log('[INFO] BackgroundGeolocation service has been stopped');
    //   // this.setState({ isRunning: false });
    // });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    // BackgroundGeolocation.on('background', () => {
    //   console.log('[INFO] App is in background');
    // });

    // BackgroundGeolocation.on('foreground', () => {
    //   console.log('[INFO] App is in foreground');
    // });

    // BackgroundGeolocation.on('abort_requested', () => {
    //   console.log('[INFO] Server responded with 285  Not RequUpdatesired');

    //   // Here we can decide whether we want stop the updates or not.
    //   // If you've configured the server to return 285, then it means the server does not require further update.
    //   // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    //   // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    // });

    // BackgroundGeolocation.on('http_authorization', () => {
    //   console.log('[INFO] App needs to authorize the http requests');
    // });

    // BackgroundGeolocation.checkStatus(status => {
    //   console.log(status);
    //   console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
    //   console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
    //   console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

    //   // you don't need to check status before start (this is just the example)
    //   if (!status.isRunning) {
    //     BackgroundGeolocation.start(); //triggers start on start event
    //   }
    // });
  }


  componentWillUnmount() {
    console.log("componentWillUnmount");
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }


  toggleTracking() {
    BackgroundGeolocation.checkStatus(({ isRunning, locationServicesEnabled, authorization }) => {
      console.log("isRunning : ",isRunning);
      if (isRunning) {
        setTimeout(() => BackgroundGeolocation.stop(), 5000);
        // BackgroundGeolocation.stop()
      } else {
        BackgroundGeolocation.start();
      }
    })
  }

  _startTracking = () => {
    console.log("start");
    BackgroundGeolocation.checkStatus(({ isRunning, locationServicesEnabled, authorization }) => {
      console.log("isRunning : ", isRunning);
      BackgroundGeolocation.start();
    });

  }

  _stopTracking = () => {
    console.log("stop");
    BackgroundGeolocation.stop();
    return false;
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Button 
          onPress={this._startTracking}
          title="추적" >
        </Button>

        <Button 
          onPress={this._stopTracking}
          title="중지">
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
