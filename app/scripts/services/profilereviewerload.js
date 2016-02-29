'use strict';

angular.module('xbertsApp')
  .factory('ProfileReviewerLoad', ['ProfileReviewer', '$q', '$rootScope', function (ProfileReviewer, $q, $rootScope) {
    return function () {
      var delay = $q.defer();
      ProfileReviewer.get({id: $rootScope.user.getUserId()}, function (reviewer) {
        delay.resolve(reviewer);
      }, function () {
        delay.reject(('Unable to fetch reviewer'));
      });
      return delay.promise;
    };
  }])
  .factory('BuyerProfileLoad', ['BuyerProfile', '$q', '$rootScope', function (BuyerProfile, $q, $rootScope) {
    return function () {
      var delay = $q.defer();
      BuyerProfile.query({user_id: $rootScope.user.getUserId()}, function (careerExperience) {
        delay.resolve(careerExperience);
      }, function () {
        delay.reject(('Unable to fetch buyer info'));
      });
      return delay.promise;
    };
  }]);
