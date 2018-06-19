'use strict';

angular.module('xbertsApp')
  .controller('SelectReportsCtrl', ['$scope', '$rootScope', 'review', '$state', 'selectedApplicantPaginator', 'submittedApplicantPaginator', function ($scope, $rootScope, review, $state, selectedApplicantPaginator, submittedApplicantPaginator) {
    $rootScope.pageSettings.setBackgroundColor('background-whitem');
    $scope.review = review;
    $scope.applicantPaginator = selectedApplicantPaginator;
    $scope.applicantCount = selectedApplicantPaginator.count;
    $scope.submittedApplicantCount = submittedApplicantPaginator.count;

    if ($rootScope.user.getUserId() != review.owner_id && !$rootScope.user.isStaff()) {
      $state.go('application.main')
    }
  }]);
