'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('EventsCtrl',['$scope','EventNoDetail','eventPaginator', function ($scope,EventNoDetail,eventPaginator) {
    $scope.eventPaginator = eventPaginator;
    $scope.eventPaginator.watch($scope,'eventPaginator.currentPage');
  }]);
