/**
 * RecommendationService.js
 * Wraps backend/database services for getting parking meter recommendations.
 */
'use strict';

var _fb = require('firebase');
var _url = require('../firebaselink').url;
var _ref = new _fb(_url);

var getRecommendations = (user, callback) => {
  if(!user.range) user.range = 0.2;
  console.log('getRecommendations', user);
  var userRef = _ref.child('Users').push(user);

  userRef
  .child('Recommendations')
  .once('child_added', () => {
    userRef
    .child('Recommendations')
    .orderByChild('distance')
    .limitToFirst(5)
    .once('value', (snapshot) => {
      var recommendations = snapshot.val();
      console.log(
        'number of recommendations',
        Object.keys(recommendations).length
      );
      userRef.remove();
      callback(sortDistance(recommendations));
    })
    userRef.off('child_added');
  })
};

var sortDistance = (objs) => {
  var arr = [];
  for (var obj in objs) {
    arr.push(objs[obj]);
  }
  return arr.sort((a,b) => a.distance-b.distance)
}

var RecommendationService = {
  getRecommendations,
};

module.exports = RecommendationService;
