'use strict';

angular.module('xbertsApp')
  .controller('ChangeEmailCtrl', ['$scope', '$rootScope', '$state', 'AccountService',
    function($scope, $rootScope, $state, AccountService) {
      $scope.data = {};
      $scope.data.email = $rootScope.user.getUserEmail();

      $scope.changeEmail = function() {
        if (!$scope.changeEmailForm.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'put');

        $scope.changeEmailForm.serverError = {};

        AccountService.changeEmail($scope.data.email)
          .then(function() {
            $rootScope.user.setUserEmail($scope.data.email);

            $scope.$emit('backdropOff', 'success');

            $scope.$close();
          })
          .catch(function(response) {
            $scope.$emit('backdropOff', 'error');

            if (response.status === 409) {
              $scope.changeEmailForm.serverError.duplicate = true;
            } else {
              $scope.changeEmailForm.serverError.generic = true;
            }
          });
    };
  }]);

