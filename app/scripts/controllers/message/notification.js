'use strict';

//todo: user info 应该在run里实现
angular.module('xbertsApp')
  .controller('NotificationCtrl', ['$scope', 'Auth', 'Paginator', 'Notification', function ($scope, Auth, Paginator, Notification) {
    $scope.notificationsCount = 0;
    Notification.notificationsCountResource().get(function (results) {
      $scope.notificationsCount = results.sum;
    });
    var fetchFunction = function (nextPage, callback) {
      Notification.notificationsResource().get({page: nextPage}, callback);
    };
    $scope.paginator = Paginator('notification', fetchFunction);
    $scope.paginator.load();
  }]);
