'use strict';

angular.module('xbertsApp')
  .factory('EventLoad', ['EventService', '$q', function(EventService, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      EventService.get($stateParams.eventId)
        .then(function (event) {
          delay.resolve(event);
        })
        .catch(function () {
          delay.reject(('Unable to fetch project'));
        });
      return delay.promise;
    };
  }]);
