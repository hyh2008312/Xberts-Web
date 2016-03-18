'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProfileinfoCtrl
 * @description
 * # ProfileinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProfileinfoCtrl', ['$scope', '$location', 'SystemConstant', 'growl', 'AnalyticsService',
    function ($scope, $location, SystemConstant, growl, AnalyticsService) {
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


      //$scope.profileForm.phoneError = !$scope.profile.phone_number;

      //if ($scope.profileForm.$valid && !$scope.profileForm.phoneError) {
      if ($scope.profileForm.$valid) {
        $scope.$emit('backdropOn', 'post');
        //if (!$scope.profile.linkedin) {
        //  $scope.profile.linkedin_url = '';
        //  $scope.profile.linkedin_connections = '';
        //}
        $scope.profile.recipient_name = $scope.profile.first_name + " " + $scope.profile.last_name;
        $scope.profile.$put(function (resp) {
          //$scope.profile.birth = new Date($scope.profile.birth);
          $scope.$emit('backdropOff', 'success');
          $scope.$emit('reviewStep', '0');

          AnalyticsService.sendPageView($location.path() + '/survey');
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
    //$scope.datePickerStatus = false;
    //$scope.open = function () {
    //  $scope.datePickerStatus = true;
    //};
    $scope.social_type = '';
    $scope.OnSocialTypeChange = function () {
      var i;
      for (i = 0; i < $scope.SOCIAL_TYPE.length; i++) {
        if ($scope.SOCIAL_TYPE[i].code == $scope.profile.other_social_type) {
          $scope.social_type = $scope.SOCIAL_TYPE[i].name;
        }
      }
    }
  }]);
