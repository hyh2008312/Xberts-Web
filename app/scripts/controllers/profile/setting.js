'use strict';

angular.module('xbertsApp')
  .controller('SettingCtrl', ['$scope', '$rootScope', '$state', '$uibModal', 'AccountService',
    function($scope, $rootScope, $state, $uibModal, AccountService) {
      $scope.changeEmailModal = function() {
        var modal = $uibModal.open({
          templateUrl: '/views/profile/change-email-modal.html',
          controller: 'ChangeEmailCtrl'
        });
      };

      $scope.changePasswordModal = function() {
        var modal = $uibModal.open({
          templateUrl: '/views/profile/change-password-modal.html',
          controller: 'ChangePasswordCtrl'
        });
      };

      $scope.cancelAccountModal = function() {
        var modal = $uibModal.open({
          templateUrl: '/views/profile/cancel-account-modal.html',
          scope: $scope
        });

        modal.result.then(function() {
          $scope.$emit('backdropOn', 'delete');

          AccountService.deactivate().then(function() {
            $scope.$emit('backdropOff', 'success');
            $rootScope.$emit('logout', false);
          }).catch(function() {
            $scope.$emit('backdropOff', 'error');
            $rootScope.$emit('logout', false);
          });
        });
    };
  }]);
