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
      $scope.event = event;
      $scope.eventProjectsLoading = true;
      $scope.eventProjects = EventProject.query({event_id: event.id}, function () {
        $scope.eventProjectsLoading = false;
      }, function () {
        $scope.eventProjectsLoading = false;
      })
    }])
  .controller('EventProjectVoteCtrl', function ($scope, $uibModalInstance, growl) {
    function reasonsRequired() {
      $scope.reasonSelected = [];
      for (var i = 0; i < $scope.reasons.length; i++) {
        if ($scope.reasons[i].selected) {
          $scope.reasonSelected.push($scope.reasons[i].name);
        }
      }
      return $scope.reasonSelected.length < 1;
    }

    $scope.reasons = [
      {id: 1, name: 'like', selected: false},
      {id: 2, name: 'like1', selected: false},
      {id: 3, name: 'like2', selected: false},
      {id: 4, name: 'like3', selected: false}
    ];
    $scope.eventProjectVoteFormSubmit = function () {
      $scope.eventProjectVoteForm.reasonsRequired = reasonsRequired();
      console.log($scope.eventProjectVoteForm.reasonsRequired);
      if ($scope.eventProjectVoteForm.$valid && !$scope.eventProjectVoteForm.reasonsRequired) {
        $uibModalInstance.close($scope.reasonSelected.join());
      } else {
        console.log("invalid");
        $scope.eventProjectVoteForm.submitted = true;
        $scope.eventProjectVoteForm.$invalid = true;
      }
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
