'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ExpertsCtrl
 * @description
 * # ExpertsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ExpertsCtrl', function ($scope,SystemData) {
    $scope.stages=SystemData.getStages();
  });
