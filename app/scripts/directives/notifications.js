'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:notifications
 * @description
 * # notifications
 */
angular.module('xbertsApp')
  .directive('notifications', function (Notification, Paginator) {
    return {
      templateUrl: 'views/notification.html',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.notificationsCount = 0;
        Notification.notificationsCountResource().get(function (results) {
          scope.notificationsCount = results.sum;
        });
        //$scope.$watch('notificationsCount',function(){
        //
        //});
        var Notifications = Notification.notificationsResource();
        var fetchFunction = function (nextPage, otherParams, callback) {
          var params = {page: nextPage};
          angular.extend(params, otherParams);
          Notifications.get(params, callback);
        };
        scope.paginator = Paginator('notification', fetchFunction);
        scope.remove = function (index) {
          var notification = new Notifications(scope.paginator.items[index]);
          scope.notificationsCount -= 1;
          scope.paginator.items.splice(index, 1);
          console.log(notification);
          notification.$delete();
        };
        scope.removeAll = function (index) {
          scope.paginator.clear();
          scope.notificationsCount = 0;
          Notification.notificationsDeleteResource().deleteAll();
        };
        console.log(scope.paginator);
        scope.loadingNotifications = function () {
          if (scope.paginator.items.length < 1) {
            scope.paginator.loadNext();
          }
        }
      }
    };
  });
