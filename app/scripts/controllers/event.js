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
      $scope.eventProjectsLoading = true;
      $scope.eventProjects = EventProject.query(function () {
        $scope.eventProjectsLoading = false;
      }, function () {
        $scope.eventProjectsLoading = false;
      })
    }])
  .controller('EventProjectVoteCtrl', function ($scope, $uibModalInstance, growl) {
    $scope.eventProjectVoteFormSubmit = function () {
      if ($scope.eventProjectVoteForm.$valid) {
      } else {
        $scope.eventProjectVoteForm.submitted = true;
        $scope.eventProjectVoteForm.$invalid = true;
      }
    };
  });
