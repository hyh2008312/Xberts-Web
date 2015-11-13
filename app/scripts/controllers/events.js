'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('EventsCtrl',['$scope','EventNoDetail','eventPaginator', function ($scope,EventNoDetail,eventPaginator) {
    $scope.eventPaginator = eventPaginator;
    $scope.eventPaginator.watch($scope,'eventPaginator.currentPage');
  }]);
