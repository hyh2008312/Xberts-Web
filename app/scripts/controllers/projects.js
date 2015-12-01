'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectsCtrl', ['$scope', 'projectPaginator', function ($scope, projectPaginator) {
    $scope.projectPaginator = projectPaginator;
    $scope.projectPaginator.watch($scope,'projectPaginator.currentPage');
  }]);
