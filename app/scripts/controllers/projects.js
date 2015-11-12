'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ProjectsCtrl', ['$scope', 'projectPaginator', function ($scope, projectPaginator) {
    $scope.projectPaginator = projectPaginator;
    $scope.projectPaginator.watch($scope,'paginator.currentPage');
  }]);
