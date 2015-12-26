'use strict';

angular.module('xbertsApp')
  .factory('Notification', ['$resource', '$rootScope', 'Configuration', function($resource, $rootScope, Configuration) {
    var user = $rootScope.user;
    var resource = {};
    resource.notificationsResource = function() {
      return $resource(Configuration.apiBaseUrl + '/notifications/:userId/', {userId: user.getUserId()});
    };
    resource.notificationsCountResource = function() {
      return $resource(Configuration.apiBaseUrl + '/notifications/:userId/count/', {
        userId: user.getUserId(),
        id: '@id'
      });
    };

    return resource;
  }]);
