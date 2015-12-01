'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ExpertsCtrl
 * @description
 * # ExpertsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ExpertsCtrl', function ($scope,SystemData,SystemConstant,expertPaginator) {
    $scope.experts={};
    $scope.stages=SystemData.getStages();
    $scope.countries=SystemConstant.COUNTRIES;
    $scope.expertPaginator = expertPaginator;
    $scope.expertPaginator.watch($scope,'expertPaginator.currentPage');

    $scope.onSearch = function () {
      console.log($scope.experts);
      $scope.expertPaginator.params=$scope.experts;
      $scope.expertPaginator.items=[];
      $scope.expertPaginator.currentPage=0;
      $scope.expertPaginator.next='true';
      $scope.expertPaginator.loadNext();
    };
    $scope.onClearSearch = function () {
      $scope.experts.search = '';
      $scope.onSearch();
    };
    $scope.onKeyDown = function ($event) {
      if ($event.keyCode === 13) {
        $scope.onSearch();
      }
    };
    $scope.onExpertsCareer=function(career){
      if ($scope.experts.career_fields__id === career) {
        $scope.experts.career_fields__id = '';
      } else {
        $scope.experts.career_fields__id=career;
      }
      $scope.onSearch();
    };
  });
