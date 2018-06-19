'use strict';

angular.module('xbertsApp')
  .controller('ResetPasswordConfirmCtrl', ['$scope', '$state', '$stateParams', 'PasswordService', 'tokenCheck',
    function($scope, $state, $stateParams, PasswordService, tokenCheck) {
    $scope.data = {email: tokenCheck.email};

    $scope.changePassword = function(form) {
      if (!$scope.resetPasswordConfirmForm.$valid) {
        return;
      }

      $scope.$emit('backdropOn', 'post');

      form.serverError = {};

      PasswordService.resetPasswordConfirm.save({
        uid: $stateParams.uid,
        token: $stateParams.token,
        password: $scope.data.newPassword
      }).$promise
        .then(function(resource) {
          $scope.$emit('backdropOff', 'success');

          $state.go('application.resetPassword.success')
        })
        .catch(function(response) {
          $scope.$emit('backdropOff', 'error');

          if (response.status === 401 || response.status === 404) {
            $state.go('application.resetPassword.error')
          } else {
            form.serverError.generic = true;
          }
        });
    };
  }]);
