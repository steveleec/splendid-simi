/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ParkingAssist = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Parking Assist
        </Text>
        <View style={styles.map}>
          <Text style={styles.text}>
            Map Component Goes Here
          </Text>
        </View>
        <Text style={styles.text}>
          Footer
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ParkingAssist', () => ParkingAssist);
