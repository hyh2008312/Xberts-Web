'use strict';

angular.module('xbertsApp')
  .controller('ShipAddressCtrl', ['$scope', 'SystemConstant', 'growl', '$rootScope', 'reviewer', 'applicant', '$state',
    'ReviewService',
    function ($scope, SystemConstant, growl, $rootScope, reviewer, applicant, $state, ReviewService) {
    //submit
    $rootScope.pageSettings.setBackgroundColor('background-whitem');
    $scope.profile = reviewer;
    $scope.review = applicant.review;
    $scope.COUNTRIES = SystemConstant.COUNTRIES;

    $scope.profileFormSubmit = function () {
      //project pre process
      $scope.profileForm.phoneError = !$scope.profile.phone_number;

      if ($scope.profileForm.$valid && !$scope.profileForm.phoneError) {
        $scope.$emit('backdropOn', 'post');

        $scope.profile.$put()
          .then(function (resp) {
            return ReviewService.confirmAddress(applicant.id);
          })
          .then(function() {
            $scope.$emit('backdropOff', 'success');
            growl.success('Thank you for confirming your shipping address. ' +
              'You will receive tracking information once the product is shipped.');

            $state.go('application.main', {reviewId: $scope.review.id});
          })
          .catch(function (resp) {
            growl.error('Sorry, some error happened.');
            $scope.$emit('backdropOff', 'error');
          });

        return false;
      } else {
        $scope.profileForm.submitted = true;
        $scope.profileForm.$invalid = true;
      }
    };
  }]);
