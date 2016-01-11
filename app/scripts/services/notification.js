'use strict';

angular.module('xbertsApp')
  .factory('Notification', ['$resource', '$rootScope', 'Configuration', function ($resource, $rootScope, Configuration) {
    var user = $rootScope.user;
    var resource = {};
    resource.notificationsResource = function () {
      return $resource(Configuration.apiBaseUrl + '/notifications/:userId/:notificationId/', {
          userId: user.getUserId(),
          notificationId: '@id'
        },
        {'removeAll': {method: 'PUT', params: {removeAll: true}}});
    };
    resource.notificationsDeleteResource = function () {
      return $resource(Configuration.apiBaseUrl + '/notifications/delete_all/', {},
        {'deleteAll': {method: 'PUT'}});
    };
    resource.notificationsCountResource = function () {
      return $resource(Configuration.apiBaseUrl + '/notifications/:userId/count/', {
        userId: user.getUserId()
      });
    };

    return resource;
  }]);
