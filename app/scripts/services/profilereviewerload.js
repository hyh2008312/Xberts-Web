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
  }]);
