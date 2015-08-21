var React = require('react-native');
var MapboxGLMap = require('react-native-mapbox-gl');
var RecommendationService = require('./RecommendationService');
var mapRef = 'mapRef';

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var METER_ICON = 'http://i.imgur.com/TTilbOY.png';

var _distance = function(latU, longU, latP, longP) {
  return Math.sqrt(Math.pow((latP - latU) * 69.1128, 2) + Math.pow((longP - longU) * 57.2807, 2));
}


var MapDisplaySection = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState() {
    return {
      meters: [],
      loaded: false,
      center: { // Santa Monica
        latitude: 34.0218629,
        longitude: -118.4804206,
      },
      zoom: 13,
    };
  },
  onRegionChange(location) {
    if(this.state.isMoving){
      this.setState({ 
        currentLocation: location,
        isMoving: false,
      });
    }
  },
  onRegionWillChange(location) {
    this.setState({isMoving: true});
    console.log('onRegionWillChange', location);
  },
  onUpdateUserLocation(location) {
    console.log('onUpdateUserLocation', location);
  },
  onOpenAnnotation(annotation) {
    console.log('onOpenAnnotation', annotation);
  },
  onRightAnnotationTapped(e) {
    console.log(e);
  },
  componentDidMount: function() {
    this.props.setMessageReceiver(this.handleMessage);
    this.getGPSUserLocation(this.setUserLocation);
  },
  getGPSUserLocation: function(callback) {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        var {latitude, longitude} = initialPosition.coords;
        var user = {latitude,longitude,zoom: 17,range: 0.2};
        callback( user );
      },
      (error) => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 60000}
    );
  },
  getMapUserLocation: function(){
    if(!this.state.isMoving){
      this.state.currentLocation && this.setUserLocation(this.state.currentLocation);
    }
  },
  setUserLocation: function(userLocation) {
    console.log('setUserLocation', userLocation);
    var { latitude, longitude, zoom } = userLocation;
    this.setState({userLocation, currentLocation: userLocation}, this.getRecommendations);
    this.setCenterCoordinateZoomLevelAnimated(mapRef, latitude, longitude, zoom);
  },
  getRecommendations: function(next) {
    RecommendationService.getRecommendations(this.state.userLocation, (meters) => {
      console.log('getRecommendations', meters);
      this.showMeters(meters);
    });
  },
  showMeters: function(meters){
    meters.forEach((meter) => {
      meter.annotationImage = {
        url: METER_ICON,
        height: 14,
        width: 25
      };
    });
    this.addAnnotations(mapRef, meters);
  },
  handleMessage: function(message) {
    switch(message){
      case 'showNextMeters':
        console.log('got next message');
        break;
      case 'setUserLocation':
        this.getMapUserLocation();
        break;
    }
  },
  renderLoadingView: function() {
    return (
      <View>
        <Text>Loading maps...</Text>
      </View>
    );
  },

  render: function() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // };
    return (
      <View style={styles.container}>
        <MapboxGLMap
          style={styles.map}
          direction={0}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          annotations={this.state.annotations}
          ref={mapRef}
          accessToken={'pk.eyJ1Ijoic3RldmVsZWVtIiwiYSI6IjgzZThjNzViM2U0Yjk0NjUyNzQxM2E2YWY1NDEyZmQxIn0.3VNCjC8-V2Y6ger0kSLjhQ'}
          styleURL={'asset://styles/mapbox-streets-v7.json'}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  map: {
    flex: 5
  },
  container: {
    flexDirection: 'column',
    flex: 1
  },
});

module.exports = MapDisplaySection;
