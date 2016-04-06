'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectsCtrl', ['$scope', 'projectPaginator', '$rootScope', 'SystemData', 'localStorageService', function ($scope, projectPaginator, $rootScope, SystemData, localStorageService) {
    $rootScope.pageSettings.setBackgroundColor('');
    $scope.projectTypes = SystemData.getProjectTypes();
    $scope.projectPaginator = projectPaginator;
    $scope.projectPaginator.watch($scope, 'projectPaginator.currentPage');
    $scope.projects = {
      project_category_id: localStorageService.get('project_search_type') || '',
      ordering: localStorageService.get('project_search_order') || '-date_published'
    };
    $scope.onSearch = function () {
      $scope.projectPaginator.params = $scope.projects;
      $scope.projectPaginator.items = [];
      $scope.projectPaginator.currentPage = 0;
      $scope.projectPaginator.next = 'true';
      $scope.projectPaginator.loadNext();
    };
    $scope.onClearSearch = function () {
      $scope.projects.search = '';
      $scope.onSearch();
    };
    $scope.onKeyDown = function ($event) {
      if ($event.keyCode === 13) {
        $scope.onSearch();
      }
    };
    $scope.$watch('projects.project_category_id + projects.ordering', function () {
      localStorageService.set('project_search_type', $scope.projects.project_category_id);
      localStorageService.set('project_search_order', $scope.projects.ordering);
    });
  }]);
