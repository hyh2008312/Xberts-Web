'use strict';

angular.module('xbertsApp')
  .controller('ReviewapplicationconfirminfoCtrl', ['$scope', '$timeout', '$state', '$filter', 'ReviewApplicant', '$rootScope', 'growl','$window',
    function ($scope, $timeout, $state, $filter, ReviewApplicant, $rootScope, growl,$window) {
      $scope.reviewApplicant = ReviewApplicant.getApplicationResource($scope.application);
      $scope.reviewApplicant.review = $scope.review.id;
      $scope.reviewApplicant.reviewer = $rootScope.user.getUserId();
      var message = 'Your application has been submitted successfully!' +
        '  You will receive an email notification ' +
        'within 7 business days after application deadline.';
      $scope.reviewApplicantConfirmFormSubmit = function () {
        if ($scope.reviewApplicantForm.$valid) {
          $scope.$emit('backdropOn', 'post');
          if ($scope.reviewApplicant.id) {
            $scope.reviewApplicant.$put(function (resp) {
              $scope.$emit('backdropOff', 'success');
              //$scope.$emit('reviewStep', '2');
              growl.success(message);
              $window.location.href='https://discover.xberts.com';
            }, function (resp) {
              growl.error('Sorry,some error happened.');
              $scope.$emit('backdropOff', 'error');
            });
          } else {
            $scope.reviewApplicant.$save(function (resp) {
              $scope.$emit('backdropOff', 'success');
              //$scope.$emit('reviewStep', '2');
              $scope.$emit('backdropOff', 'success');
              growl.success(message);
              $window.location.href='https://discover.xberts.com';
            }, function (resp) {
              growl.error('Sorry,some error happened.');
              $scope.$emit('backdropOff', 'error');
            });
          }

          return false;

        } else {
          $scope.reviewApplicantForm.submitted = true;
          $scope.reviewApplicantForm.$invalid = true;
        }
      };
    }]);
