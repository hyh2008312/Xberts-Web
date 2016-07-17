'use strict';

angular.module('xbertsApp')
  .controller('EventCtrl', ['$scope', '$rootScope', 'EventProject', 'event',
    function ($scope, $rootScope, EventProject, event) {
      var title = event.title;
      var description = '';
      var backgroundColor = 'background-whitem';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);


      $scope.event = event;
      $scope.eventProjectsLoading = true;
      $scope.eventProjects = EventProject.query({event_id: event.id}, function () {
        $scope.eventProjectsLoading = false;
      }, function () {
        $scope.eventProjectsLoading = false;
      });
    }])
  .controller('VoteCtrl', ['$scope', '$rootScope', 'EventProject', '$stateParams',
    function ($scope, $rootScope, EventProject, $stateParams) {
      $rootScope.bodyBackground = 'background-whitem';
      $scope.eventId = $stateParams.eventId;
      $scope.eventProjectsLoading = true;
      $scope.eventProjects = EventProject.query({event_id: $scope.eventId}, function () {
        $scope.eventProjectsLoading = false;
      }, function () {
        $scope.eventProjectsLoading = false;
      });
    }])
  .controller('EventProjectVoteCtrl', function ($scope, $uibModalInstance, growl) {
    $scope.reasonSelected = [];
    function reasons() {
      var reasonSelected = [];
      for (var i = 0; i < $scope.reasons.length; i++) {
        if ($scope.reasons[i].selected) {
          reasonSelected.push($scope.reasons[i].name);
        }
      }
      $scope.reasonSelected = reasonSelected;
      return reasonSelected.length;
    }

    $scope.reasons = [
      {id: 1, name: 'Innovative and unique', selected: false},
      {id: 2, name: 'World-class design', selected: false},
      {id: 3, name: 'Smart and technologically advanced', selected: false},
      {id: 4, name: 'Makes my life easier and better', selected: false},
      {id: 5, name: 'Takes care of my health', selected: false},
      {id: 6, name: 'A great gift for my family and friends', selected: false},
      {id: 7, name: 'Reasonably priced', selected: false}
    ];
    $scope.eventProjectVoteFormSubmit = function () {
      reasons();
      $scope.eventProjectVoteForm.reasonsRequired = $scope.reasonSelected.length < 1;
      $scope.eventProjectVoteForm.reasonsMax = $scope.reasonSelected.length > 3;
      if ($scope.eventProjectVoteForm.$valid && !$scope.eventProjectVoteForm.reasonsRequired && !$scope.eventProjectVoteForm.reasonsMax) {
        $uibModalInstance.close($scope.reasonSelected.join());
      } else {
        $scope.eventProjectVoteForm.submitted = true;
        $scope.eventProjectVoteForm.$invalid = true;
      }
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.$watch(reasons, function () {
      $scope.eventProjectVoteForm.reasonsRequired = $scope.reasonSelected.length < 1;
      $scope.eventProjectVoteForm.reasonsMax = $scope.reasonSelected.length > 3;
    })
  })
  .controller('VoteOffCtrl', ['$scope', '$rootScope', 'EventProject', '$stateParams',
    function ($scope, $rootScope, EventProject, $stateParams) {
      $rootScope.bodyBackground = 'background-whitem';
      $scope.eventId = $stateParams.eventId;
      $scope.eventProjectsLoading = true;
      $scope.eventProjects = EventProject.query({event_id: $scope.eventId}, function () {
        $scope.eventProjectsLoading = false;
      }, function () {
        $scope.eventProjectsLoading = false;
      });
    }])
  .controller('EventProjectVoteOffCtrl', function ($scope, $uibModalInstance, growl, SystemConstant) {
    $scope.countries = SystemConstant.COUNTRIES;
    $scope.voter = {};
    $scope.reasonSelected = [];
    function reasons() {
      var reasonSelected = [];
      for (var i = 0; i < $scope.reasons.length; i++) {
        if ($scope.reasons[i].selected) {
          reasonSelected.push($scope.reasons[i].name);
        }
      }
      $scope.reasonSelected = reasonSelected;
      return reasonSelected.length;
    }

    $scope.reasons = [
      {id: 1, name: 'Innovative and unique', selected: false},
      {id: 2, name: 'World-class design', selected: false},
      {id: 3, name: 'Smart and technologically advanced', selected: false},
      {id: 4, name: 'Makes my life easier and better', selected: false},
      {id: 5, name: 'Takes care of my health', selected: false},
      {id: 6, name: 'A great gift for my family and friends', selected: false},
      {id: 7, name: 'Reasonably priced', selected: false}
    ];
    $scope.eventProjectVoteFormSubmit = function () {
      reasons();
      $scope.eventProjectVoteForm.reasonsRequired = $scope.reasonSelected.length < 1;
      $scope.eventProjectVoteForm.reasonsMax = $scope.reasonSelected.length > 3;
      if ($scope.eventProjectVoteForm.$valid && !$scope.eventProjectVoteForm.reasonsRequired && !$scope.eventProjectVoteForm.reasonsMax) {
        $scope.voter.reasons = $scope.reasonSelected.join();
        $uibModalInstance.close($scope.voter);
      } else {
        $scope.eventProjectVoteForm.submitted = true;
        $scope.eventProjectVoteForm.$invalid = true;
      }
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.$watch(reasons, function () {
      $scope.eventProjectVoteForm.reasonsRequired = $scope.reasonSelected.length < 1;
      $scope.eventProjectVoteForm.reasonsMax = $scope.reasonSelected.length > 3;
    })
  });