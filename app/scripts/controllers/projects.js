'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectsCtrl', ['$scope', 'projectPaginator', 'SystemData', function ($scope, projectPaginator, SystemData) {
    $scope.projectTypes = SystemData.getProjectTypes();
    $scope.projectPaginator = projectPaginator;
    $scope.projectPaginator.watch($scope, 'projectPaginator.currentPage');
    $scope.projects = {ordering: '-date_published'};
    $scope.onSearch = function () {
      $scope.projectPaginator.params = $scope.projects;
      $scope.projectPaginator.items = [];
      $scope.projectPaginator.currentPage = 0;
      $scope.projectPaginator.next = 'true';
      $scope.projectPaginator.loadNext();
    };
  }]);
