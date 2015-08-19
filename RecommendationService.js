/**
 * RecommendationService.js
 * Wraps backend/database services for getting parking meter recommendations.
 */
'use strict';

var _fb = require('firebase');
var _url = require('./firebaselink').url;
var _ref = new _fb(_url);

/* @flow */
type UserType = {
  latitude: Number,
  longitude: Number,
  range: Number,
};

var getRecommendations = (user: UserType, callback) => {
  var userRef = _ref.child('Users').push(user);

  userRef
  .child('Recommendations')
  .once('child_added', () => {
    userRef
    .child('Recommendations')
    .orderByChild('distance')
    .once('value', (snapshot) => {
      var recommendations = snapshot.val();
      console.log(
        'number of recommendations',
        Object.keys(recommendations).length
      );
      userRef.remove();
      callback(recommendations);
    })
    userRef.off('child_added');
  })
};


var RecommendationService = {
  getRecommendations,
};

module.exports = RecommendationService;