'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:SurveyconfirminfoCtrl
 * @description
 * # SurveyconfirminfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationconfirminfoCtrl', ['$scope', '$state', 'ReviewApplicant', '$rootScope', 'growl',
    function ($scope, $state, ReviewApplicant, $rootScope, growl) {
    $scope.reviewApplicant = ReviewApplicant.getApplicationResource($scope.application);
    $scope.reviewApplicant.review = $scope.review.id;
    $scope.reviewApplicant.reviewer = $rootScope.user.getUserId();
    $scope.reviewApplicantConfirmFormSubmit = function () {
      if ($scope.reviewApplicantForm.$valid) {
        $scope.$emit('backdropOn', 'post');
        if( $scope.reviewApplicant.id){
          $scope.reviewApplicant.$put(function (resp) {
            $scope.$emit('backdropOff', 'success');
            //$scope.$emit('reviewStep', '2');
            $state.go('application.crowdtestings');
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
          });
        }else{
          $scope.reviewApplicant.$save(function (resp) {
            $scope.$emit('backdropOff', 'success');
            //$scope.$emit('reviewStep', '2');
            $scope.$emit('backdropOff', 'success');
            $state.go('application.crowdtestings');
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
