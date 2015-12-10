'use strict';

angular.module('xbertsApp')
  .controller('ResetPasswordCtrl', ['$scope', '$state', 'PasswordService', function($scope, $state, PasswordService) {
    $scope.data = {};

    $scope.sendEmail = function(form) {
      $scope.$emit('backdropOn', 'post');

      form.serverError = {};

      PasswordService.resetPasswordRequest.save({
        email: $scope.data.email
      }).$promise
        .then(function(resource) {
          $scope.$emit('backdropOff', 'success');

          $state.go('application.resetPassword.sent')
        })
        .catch(function(response) {
          $scope.$emit('backdropOff', 'error');

          if (response.status === 404) {
            form.serverError.emailNotFound = true;
          } else {
            form.serverError.generic = true;
          }
        });
    };
  }]);
