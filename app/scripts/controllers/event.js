'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('EventCtrl', ['$scope', '$rootScope', 'EventProject', 'event',
    function ($scope, $rootScope, EventProject, event) {
      $rootScope.bodyBackground = 'background-whitem';
      $scope.register = {
        status: false
      };
      $scope.onRegisterToggle = function () {
        $scope.register.status = !$scope.register.status;
      };
      $scope.event = event;
      $scope.projectLoading = false;
      $scope.projects = EventProject.query(function () {
        console.log($scope.projects);
        $scope.projectLoading = false;
      }, function () {
        $scope.projectLoading = false;
      })
    }]);
