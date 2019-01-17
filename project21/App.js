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
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 60000,
      fastestInterval: 120000,
      activitiesInterval: 100000,
      // interval: 10000,
      // fastestInterval: 5000,
      // activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar'
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar' // you can also add your own properties
      }
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log(location);
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

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
      this.setState({ isRunning: true });
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
      this.setState({ isRunning: false });
    });

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

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log(status);
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        // BackgroundGeolocation.start(); //triggers start on start event
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }


  componentWillUnmount() {
    console.log("removeAllListeners");
    // unregister all event listeners
    BackgroundGeolocation.removeAllListeners();
  }


  toggleTracking() {
    BackgroundGeolocation.checkStatus(({ isRunning, locationServicesEnabled, authorization }) => {
      console.log("isRunning : ",isRunning);
      if (isRunning) {
        
        setTimeout(() => {
          console.log("ddddddddddddddddddddddddddddddddddddddd")
          BackgroundGeolocation.stop()
        }, 1000)
        // BackgroundGeolocation.stop()
        
      } else {
        BackgroundGeolocation.start();
      }

      // if (!locationServicesEnabled) {
      //   Alert.alert(
      //     'Location services disabled',
      //     'Would you like to open location settings?',
      //     [
      //       {
      //         text: 'Yes',
      //         onPress: () => BackgroundGeolocation.showLocationSettings()
      //       },
      //       {
      //         text: 'No',
      //         onPress: () => console.log('No Pressed'),
      //         style: 'cancel'
      //       }
      //     ]
      //   );
      //   return false;
      // }

    //   if (authorization == 99) {
    //     // authorization yet to be determined
    //     BackgroundGeolocation.start();
    //   } else if (authorization == BackgroundGeolocation.AUTHORIZED) {
    //     // calling start will also ask user for permission if needed
    //     // permission error will be handled in permisision_denied event
    //     BackgroundGeolocation.start();
    //   } else {
    //     Alert.alert(
    //       'App requires location tracking',
    //       'Please grant permission',
    //       [
    //         {
    //           text: 'Ok',
    //           onPress: () => BackgroundGeolocation.start()
    //         }
    //       ]
    //     );
    //   }
    // });
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Button onPress={this.toggleTracking}
        title={(this.state.isRunning) ? "중지" : "추적"}>
          <Text>start/stop</Text>
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
