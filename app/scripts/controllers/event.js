'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('EventCtrl', ['$scope','$rootScope','Paginator','ProjectsNoDetail', '$stateParams', 'event', function ($scope,$rootScope,Paginator,ProjectsNoDetail, $stateParams, event) {
    $rootScope.bodyBackground = 'background-whitem';
    $scope.register = {
      status: false
    };
    $scope.onRegisterToggle = function () {
      $scope.register.status = !$scope.register.status;
    };
    $scope.event = event;
  }]);
