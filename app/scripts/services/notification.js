'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.Notification
 * @description
 * # Notification
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Notification', ['$resource', '$rootScope',function ($resource,$rootScope) {
    // Service logic
    // ...

    //var meaningOfLife = 42 ;
    var user = $rootScope.user;
    var resource={};
    resource.notificationsResource=function(){
      return $resource('http://127.0.0.1:8000/notifications/:userId/', {userId:user.getUserId()});
    };
    resource.notificationsCountResource=function(){
      return $resource('http://127.0.0.1:8000/notifications/:userId/count/', {userId:user.getUserId(),id: '@id'});
    };

    // Public API here
    return resource;
  }]);
