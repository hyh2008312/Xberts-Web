'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProfileinfoCtrl
 * @description
 * # ProfileinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ShipAddressCtrl', ['$scope', 'SystemConstant', 'growl', '$rootScope', 'reviewer', 'review', '$state', function ($scope, SystemConstant, growl, $rootScope, reviewer, review, $state) {
    //submit
    $rootScope.bodyBackground = 'background-whitem';
    $scope.profile = reviewer;
    $scope.review = review;
    $scope.COUNTRIES = SystemConstant.COUNTRIES;
    $scope.profileFormSubmit = function () {
      //project pre process
      $scope.profileForm.phoneError = !$scope.profile.phone_number;

      if ($scope.profileForm.$valid && !$scope.profileForm.phoneError) {
        $scope.$emit('backdropOn', 'post');
        $scope.profile.$put(function (resp) {
          $scope.$emit('backdropOff', 'success');
        }, function (resp) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          $state.go('application.review', {reviewId: review.id});
          //console.log(resp);
        });
        return false;

      } else {
        $scope.profileForm.submitted = true;
        $scope.profileForm.$invalid = true;
      }
    };
  }]);
