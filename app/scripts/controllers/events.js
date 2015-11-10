'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('EventsCtrl',['$scope','EventNoDetail','Paginator', function ($scope,EventNoDetail,Paginator) {
    var fetchFunction = function (nextPage, callback) {
      EventNoDetail.get({page: nextPage}, callback);
    };
    $scope.paginator = Paginator('event', fetchFunction);
    $scope.paginator.watch($scope,'paginator.currentPage');
  }]);
