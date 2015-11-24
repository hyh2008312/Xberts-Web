'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ProfileinfoCtrl
 * @description
 * # ProfileinfoCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ProfileinfoCtrl',['$scope','SystemConstant',function ($scope, SystemConstant) {
    console.log($scope.profile);
    $scope.COUNTRIES = SystemConstant.COUNTRIES;
    $scope.GENDER_TYPE = SystemConstant.GENDER_TYPE;
    $scope.CAREER_STATUS = SystemConstant.CAREER_STATUS;
    $scope.COMPANY_SIZE = SystemConstant.COMPANY_SIZE;
    $scope.JOB_FUNCTION = SystemConstant.JOB_FUNCTION;
    $scope.INDUSTRY = SystemConstant.INDUSTRY;
    $scope.SOCIAL_TYPE = SystemConstant.SOCIAL_TYPE;
    $scope.LINKEDIN_CONNECTION = SystemConstant.LINKEDIN_CONNECTION;

    //submit
    $scope.profileFormSubmit = function () {
      //project pre process

      if ($scope.profileForm.$valid) {
        $scope.$emit('backdropOn', 'post');
        $scope.profile.$put(function (resp) {
          $scope.$emit('backdropOff', 'success');
          $scope.$emit('reviewStep', '0');
        }, function (resp) {
          alert('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          console.log(resp);
        });
        return false;

      } else {
        $scope.profileForm.submitted = true;
        $scope.profileForm.$invalid = true;
      }
    };
    $scope.datePickerStatus = false;
    $scope.open = function () {
      $scope.datePickerStatus = true;
    };
  }]);
