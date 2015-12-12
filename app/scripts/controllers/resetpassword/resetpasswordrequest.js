'use strict';

angular.module('xbertsApp')
  .controller('ResetPasswordRequestCtrl', ['$scope', function($scope) {
    $scope.sendEmail = function(form) {
      if (!$scope.resetPasswordRequestForm.$valid) {
        return;
      }

      $scope.$parent.sendEmail(form);
    }
  }]);
