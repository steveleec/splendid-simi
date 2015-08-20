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

// var MOCK_USER = {
//   latitude: 34.0218629,
//   longitude: -118.4804206,
//   zoom: 13,
//   range: 0.2,
// };

// var USER_ICON = 'http://icon-park.com/imagefiles/location_map_pin_red8.png';
var METER_ICON = 'http://i.imgur.com/qlqr8GX.png';

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
    console.log('onRegionChange',location);
    this.setState({ currentZoom: location.zoom });
  },
  onRegionWillChange(location) {
    console.log('onRegionWillChange', location);
  },
  onUpdateUserLocation(location) {
    console.log(location);
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
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
        console.log('setUser', user);
        callback( user );
      },
      (error) => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 60000}
    );
  },
  getMapUserLocation: function(){
    console.log('do something with current map center');
  },
  setUserLocation: function(userLocation) {
    var { latitude, longitude, zoom } = userLocation;
    this.setState({userLocation});
    this.getRecommendations(() => {
      this.showMeters(this.getNextMeters());
    });
    this.setCenterCoordinateZoomLevelAnimated(mapRef, latitude, longitude, zoom);
    // var userAnnotation = {
    //   latitude, longitude, title: 'you are here',
    //   annotationImage: {
    //     url: USER_ICON,
    //     height: 25,
    //     width: 25
    //   }
    // };
    // this.addAnnotations(mapRef, [userAnnotation]);
    // this.setState({userAnnotation});
  },
  getRecommendations: function(next) {
    RecommendationService.getRecommendations(this.state.userLocation, (meters) => {
      console.log('getRecommendations', meters);
      this.setState({ meters, index:0}, next);
    });
  },
  getNextMeters: function() {
    var meters = this.state.meters || [],
        index = this.state.index || 0;
    var SHOW_N_METERS = 10;
    var from = index * SHOW_N_METERS,
        to = (index + 1) * SHOW_N_METERS,
        nextMeters = meters.slice(from, to);
    if (!nextMeters.length) {
      console.log('resetting');
      index = 0;
      nextMeters = meters.slice(0,10);
    }
    this.setState({index: index + 1});
    return nextMeters;
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
        this.showMeters(this.getNextMeters());
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
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          annotations={this.state.annotations}
          ref={mapRef}
          accessToken={'pk.eyJ1Ijoic3RldmVsZWVtIiwiYSI6IjgzZThjNzViM2U0Yjk0NjUyNzQxM2E2YWY1NDEyZmQxIn0.3VNCjC8-V2Y6ger0kSLjhQ'}
          styleURL={'asset://styles/mapbox-streets-v7.json'}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          zoomLevel={this.state.zoom}/>
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
