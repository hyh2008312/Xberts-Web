'use strict';

angular.module('xbertsApp')
  .controller('ChangePasswordCtrl', ['$scope', 'PasswordService', function($scope, PasswordService) {
    $scope.changePassword = function() {
      if (!$scope.changePasswordForm.$valid) {
        return;
      }

      $scope.$emit('backdropOn', 'put');

      $scope.changePasswordForm.serverError = {};

      PasswordService.changePassword($scope.data.password, $scope.data.newPassword)
        .then(function() {
          $scope.$emit('backdropOff', 'success');

          $scope.$close();
        })
        .catch(function(response) {
          $scope.$emit('backdropOff', 'error');

          if (response.status === 406) {
            $scope.changePasswordForm.serverError.password = true;
          } else {
            $scope.changePasswordForm.serverError.generic = true;
          }
        });
    };
  }]);
