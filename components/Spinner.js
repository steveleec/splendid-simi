var React = require('react-native');

var {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0)',
  },
  spinner: {
    flex: 1, width: 50, height: 50,
  },
});

var Spinner = React.createClass({
  render: function() {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicatorIOS style={styles.spinner}
          animating={true}
          color="#111"
          size="large"
        />
      </View>
    );
  },
});

module.exports = Spinner;
