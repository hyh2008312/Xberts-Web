'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:SurveyconfirminfoCtrl
 * @description
 * # SurveyconfirminfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationconfirminfoCtrl',['$scope','ReviewApplicant','$rootScope', function ($scope,ReviewApplicant,$rootScope) {
    $scope.reviewApplicant=ReviewApplicant.getNewInstance();
    $scope.reviewApplicant.review=$scope.review.id;
    $scope.reviewApplicant.reviewer=$rootScope.user.getUserId();
    $scope.reviewApplicantConfirmFormSubmit = function () {
      if ($scope.reviewApplicantForm.$valid) {
        $scope.$emit('backdropOn', 'post');
        $scope.reviewApplicant.$save(function (resp) {
          $scope.$emit('backdropOff', 'success');
          $scope.$emit('reviewStep', '2');
        }, function (resp) {
          alert('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          console.log(resp);
        });
        return false;

      } else {
        $scope.reviewApplicantForm.submitted = true;
        $scope.reviewApplicantForm.$invalid = true;
      }
    };
  }]);
