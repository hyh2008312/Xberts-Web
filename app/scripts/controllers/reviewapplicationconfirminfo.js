'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:SurveyconfirminfoCtrl
 * @description
 * # SurveyconfirminfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationconfirminfoCtrl',['$scope','ReviewApplicant','$rootScope','growl' ,function ($scope,ReviewApplicant,$rootScope,growl) {
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
          growl.error('Sorry,some error happened.');
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
