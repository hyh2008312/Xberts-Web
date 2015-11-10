'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ProjectsCtrl', ['$scope', 'Paginator', 'ProjectsNoDetail', function ($scope, Paginator, ProjectsNoDetail) {
    var fetchFunction = function (nextPage, callback) {
      ProjectsNoDetail.get({page: nextPage}, callback);
    };
    $scope.paginator = Paginator('project', fetchFunction);
    $scope.paginator.watch($scope,'paginator.currentPage');
    //$scope.paginator.load();
  }]);
