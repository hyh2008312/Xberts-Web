'use strict';

angular.module('xbertsApp')
  .directive('notifications', function ($rootScope, Notification, Paginator) {
    return {
      templateUrl: 'views/directive/notification.html',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if (!$rootScope.user.isAuth()) return;
        scope.notificationsCount = 0;
        Notification.notificationsCountResource($rootScope.user.getUserId()).get(function (results) {
          scope.notificationsCount = results.sum;
        });
        var Notifications = Notification.notificationsResource($rootScope.user.getUserId());
        var par = {
          name: 'notification',
          fetchFunction: function (params) {
            return Notifications.get(params).$promise;
          }
        };
        scope.paginator = Paginator(par);
        scope.remove = function (index) {
          var notification = new Notifications(scope.paginator.items[index]);
          scope.notificationsCount -= 1;
          scope.paginator.items.splice(index, 1);
          notification.$delete();
        };
        scope.removeAll = function (index) {
          scope.paginator.clear();
          scope.notificationsCount = 0;
          Notification.notificationsDeleteResource().deleteAll();
        };
        scope.loadingNotifications = function () {
          scope.paginator.clear();
          scope.paginator.loadNext().then(function () {
            scope.notificationsCount = scope.paginator.getCount();
          });
        }
      }
    };
  });
