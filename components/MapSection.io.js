var React = require('react-native');
var RNGeocoder = require('react-native-geocoder');
var MapboxGLMap = require('react-native-mapbox-gl');
var mapRef = 'mapRef';

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var MapDisplaySection = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState() {
    return {
      loaded: false,
      center: {
         latitude: 34.019236,
         longitude: -118.494370,
       },
       zoom: 15,
       annotations: [
       {
         latitude: 34.019236,
         longitude:  -118.494370,
         title: 'MakerSquare LA',
         subtitle: 'School',
         rightCalloutAccessory: {
             url: 'https://cldup.com/9Lp0EaBw5s.png',
             height: 25,
             width: 25
         },
         annotationImage: {
           url: 'https://pbs.twimg.com/profile_images/542918126111703041/wP1SX3kg_400x400.png',
           height: 25,
           width: 25
         },
         id: 'marker0'
       }]
    };
  },
  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },
  onRegionWillChange(location) {
    console.log(location);
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
    // Fetch the data from the API here!
    // change to loaded true once the data is gotten.
    this.fetchData();
  },
  fetchData: function(){
    /*
    fetch(URL)...
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
          loaded: true,
          dataSource: responseData
        });
    })
    ..done()
    */
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
