'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.EventLoad
 * @description
 * # EventLoad
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('EventLoad', ['Event', '$q', function (Event, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      Event.get({id:$stateParams.eventId}, function (event) {
        delay.resolve(event);
      }, function () {
        delay.reject(('Unable to fetch project'));
      });
      return delay.promise;
    }
  }]);
