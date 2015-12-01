'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the xbertsApp
 */
//todo: user info 应该在run里实现
angular.module('xbertsApp')
  .controller('NotificationCtrl', ['$scope', 'Auth', 'Paginator', 'Notification', function ($scope, Auth, Paginator, Notification) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.notificationsCount = 0;
    Notification.notificationsCountResource().get(function (results) {
      $scope.notificationsCount = results.sum;
    });
    //$scope.$watch('notificationsCount',function(){
    //
    //});
    var fetchFunction = function (nextPage, callback) {
      Notification.notificationsResource().get({page: nextPage}, callback);
    };
    $scope.paginator = Paginator('notification', fetchFunction);
    $scope.paginator.load();
  }]);
