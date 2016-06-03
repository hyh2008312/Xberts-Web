'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ExpertsCtrl
 * @description
 * # ExpertsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ExpertsCtrl', function ($scope, $rootScope, SystemData, SystemConstant, expertPaginator) {
    $rootScope.pageSettings.setBackgroundColor('');

    $scope.expertSearch = {};
    $scope.stages = SystemData.getStages();
    $scope.countries = SystemConstant.COUNTRIES;
    $scope.expertPaginator = expertPaginator;
    $scope.onSearch = function () {
      $scope.expertPaginator.params = $scope.expertSearch;
      //console.log($scope.experts);
      $scope.expertPaginator.clear();
      $scope.expertPaginator.loadNext();
    };
    $scope.onClearSearch = function () {
      $scope.expertSearch.search = '';
      $scope.onSearch();
    };
    $scope.onKeyDown = function ($event) {
      if ($event.keyCode === 13) {
        $scope.onSearch();
      }
    };
    $scope.onExpertsCareer = function (career) {
      if ($scope.expertSearch.career_fields__id === career) {
        $scope.expertSearch.career_fields__id = '';
      } else {
        $scope.expertSearch.career_fields__id = career;
      }
      $scope.onSearch();
    };
  });
