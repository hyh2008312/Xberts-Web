'use strict';

angular.module('xbertsApp')
  .controller('ShipAddressCtrl', ['$scope', 'SystemConstant', 'growl', '$rootScope', 'reviewer', 'review', '$state', function ($scope, SystemConstant, growl, $rootScope, reviewer, review, $state) {
    //submit
    $rootScope.pageSettings.setBackgroundColor('background-whitem');
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
          growl.success('Thank you for confirming your shipping address. ' +
            'You will receive tracking information once the product is shipped.');

          $state.go('application.main', {reviewId: review.id});
        }, function (resp) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
        });
        return false;

      } else {
        $scope.profileForm.submitted = true;
        $scope.profileForm.$invalid = true;
      }
    };
  }]);
