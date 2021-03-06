/**
 * ParkAssist-React-Native
 * https://github.com/BeamingBaldwin/splendid-simi
 */
'use strict';

var React = require('react-native');
var RecommendationService = require('./RecommendationService');
var MapDisplaySection = require('./components/MapSection.io.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var MOCK_USER = {
  latitude: 34.0192475,
  longitude: -118.4942426,
  range: 0.2,
};
var colors = {
  black: '#000',
  white: '#fff',
  midnight: '#24313F',
  midnightBlue: '#2c3e50',
  wetAsphault: '#34495e',
  concrete: '#95a5a6',
  abestos: '#7f8c8d',
  clouds: '#ecf0f1',
  silver: '#bdc3c7',
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.wetAsphault,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: colors.midnight,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.clouds,
  },
  map: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    padding: 16,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 16,
    borderRadius: 4,
    backgroundColor: colors.midnight,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.clouds,
  },
});
var ParkingAssist = React.createClass({
  getInitialState: () => {
    return { meters: [] };
  },

  componentDidMount: function() {
    RecommendationService.getRecommendations(MOCK_USER, (meters) => {
      this.setState({ meters });
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            PARKING ASSIST
          </Text>
        </View>
        <View style={styles.map}>
          <Text style={styles.text}>
            Map Component Goes Here
          </Text>
          <MapDisplaySection />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.button}
            onPress={this._handleNextMeterBtnClick}>
              <Text style={styles.buttonText}>NEXT METER</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this._handleSetLocationBtnClick}>
              <Text style={styles.buttonText}>SET LOCATION</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  _handleNextMeterBtnClick: function() {
    console.log('_handleNextMeterBtnClick');
  },

  _handleSetLocationBtnClick: function() {
    console.log('_handleSetLocationBtnClick');
  },
});

AppRegistry.registerComponent('ParkingAssist', () => ParkingAssist);
