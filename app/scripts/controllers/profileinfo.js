'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProfileinfoCtrl
 * @description
 * # ProfileinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProfileinfoCtrl',['$scope','SystemConstant','growl',function ($scope, SystemConstant, growl) {
    $scope.COUNTRIES = SystemConstant.COUNTRIES;
    $scope.GENDER_TYPE = SystemConstant.GENDER_TYPE;
    $scope.CAREER_STATUS = SystemConstant.CAREER_STATUS;
    $scope.COMPANY_SIZE = SystemConstant.COMPANY_SIZE;
    $scope.JOB_FUNCTION = SystemConstant.JOB_FUNCTION;
    $scope.INDUSTRY = SystemConstant.INDUSTRY;
    $scope.SOCIAL_TYPE = SystemConstant.SOCIAL_TYPE;
    $scope.LINKEDIN_CONNECTION = SystemConstant.LINKEDIN_CONNECTION;
    $scope.OTHER_CONNECTION = SystemConstant.OTHER_CONNECTION;

    //submit
    $scope.profileFormSubmit = function () {
      //project pre process


      $scope.profileForm.phoneError=!$scope.profile.phone_number;

      if ($scope.profileForm.$valid && !$scope.profileForm.phoneError) {
        $scope.$emit('backdropOn', 'post');
        if(!$scope.profile.linkedin){
          $scope.profile.linkedin_url='';
          $scope.profile.linkedin_connections='';
        }
        $scope.profile.$put(function (resp) {
          $scope.$emit('backdropOff', 'success');
          $scope.$emit('reviewStep', '0');
        }, function (resp) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          //console.log(resp);
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
    $scope.social_type='';
    $scope.OnSocialTypeChange=function(){
      var i;
      for(i=0;i<$scope.SOCIAL_TYPE.length;i++){
        if($scope.SOCIAL_TYPE[i].code==$scope.profile.other_social_type){
          $scope.social_type=$scope.SOCIAL_TYPE[i].name;
        }
      }
    }
  }]);
