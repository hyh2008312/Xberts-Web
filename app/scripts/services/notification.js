'use strict';

angular.module('xbertsApp')
  .factory('Notification', ['$resource', 'Configuration', function ($resource, Configuration) {
    var resource = {};
    resource.notificationsResource = function (userId) {
      return $resource(Configuration.apiBaseUrl + '/notifications/:userId/:notificationId/', {
          userId: userId,
          notificationId: '@id'
        },
        {'removeAll': {method: 'PUT', params: {removeAll: true}}});
    };
    resource.notificationsDeleteResource = function () {
      return $resource(Configuration.apiBaseUrl + '/notifications/delete_all/', {},
        {'deleteAll': {method: 'PUT'}});
    };
    resource.notificationsCountResource = function (userId) {
      return $resource(Configuration.apiBaseUrl + '/notifications/:userId/count/', {
        userId: userId
      });
    };

    return resource;
  }]);
