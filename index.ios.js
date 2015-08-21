'use strict';

var React = require('react-native');
var MapDisplaySection = require('./components/MapSection.io.js');

var mapRef = 'mapRef';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;


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
    flex: 1, flexDirection: 'row', position: 'absolute', right: 0, bottom: 0, left: 0, padding: 16, backgroundColor: 'rgba(0,0,0,0)',
  },
  setLocationBtn: {
    flex: 1, alignItems: 'center', margin: 8, padding: 16, borderRadius: 4, backgroundColor: colors.midnight,
  },
  setLocationBtnText: {
    fontFamily: 'Montserrat-Bold', color: colors.clouds,
  },
  resetLocationBtn: {
    flex: 0, margin: 8, padding: 16, borderRadius: 4, backgroundColor: colors.midnight,
  },
  resetLocationBtnText: {
    fontFamily: 'Montserrat-Bold', color: colors.clouds,
  },
  spinner: {
    width: 50, height: 50, backgroundColor: "red"
  },
});
var ParkingAssist = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
    };
  },
  componentDidMount: function() {
    StatusBarIOS.setStyle(1);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            PRK
          </Text>
        </View>
        <View style={styles.map}>
          <MapDisplaySection setMessageReceiver={this.setMessageReceiver} handleLoading={this.handleLoading} ref={mapRef} />
        </View>
        <ActivityIndicatorIOS style={styles.spinner}
          animating={this.state.isLoading}
          color="#111"
          size="large"
        />
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.setLocationBtn}
            onPress={this._handleSetLocationBtnClick}
          >
              <Text style={styles.setLocationBtnText}>Redo Search In This Area</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.resetLocationBtn}
            onPress={this._handleResetLocationBtnClick}
          >
            <Text style={styles.resetLocationBtnText}>¤</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  setMessageReceiver: function(messageReceiver) {
    this.setState({messageReceiver});
  },
  _handleSetLocationBtnClick: function() {
    this.setState({isLoading: true});
    console.log('_handleSetLocationBtnClick');
    this.state.messageReceiver('setUserLocation');
  },
  _handleResetLocationBtnClick: function() {
    console.log('_handleResetLocationBtnClick');
    this.state.messageReceiver('resetUserLocation');
  },
  handleLoading: function(bool) {
    this.setState({isLoading: bool});
  },
});

AppRegistry.registerComponent('ParkingAssist', () => ParkingAssist);
