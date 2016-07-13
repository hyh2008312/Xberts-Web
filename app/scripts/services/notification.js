'use strict';

angular.module('xbertsApp')
  .factory('Notification', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    var resource = {};
    resource.notificationsResource = function (userId) {
      return $resource(API_BASE_URL + '/notifications/:userId/:notificationId/', {
          userId: userId,
          notificationId: '@id'
        },
        {'removeAll': {method: 'PUT', params: {removeAll: true}}});
    };
    resource.notificationsDeleteResource = function () {
      return $resource(API_BASE_URL + '/notifications/delete_all/', {},
        {'deleteAll': {method: 'PUT'}});
    };
    resource.notificationsCountResource = function (userId) {
      return $resource(API_BASE_URL + '/notifications/:userId/count/', {
        userId: userId
      });
    };

    return resource;
  }]);
