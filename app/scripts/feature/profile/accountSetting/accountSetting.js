angular.module('xbertsApp')
  .directive('accountSetting', ['$rootScope', '$uibModal', '$mdDialog','AccountService', 'PasswordService', function($rootScope, $uibModal, $mdDialog, AccountService, PasswordService) {
    return {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'scripts/feature/profile/accountSetting/account-setting.html',
      link: function (scope, element, attrs, ctrls) {
        scope.showEditPassword = !$rootScope.user.isLinkedinSignup();

        scope.data = {};
        scope.data.email = $rootScope.user.getUserEmail();

        var oldData = angular.copy(scope.data, {});

        scope.changeEmail = function() {
          if (!scope.changeEmailForm.$valid) {
            return;
          }

          scope.$emit('backdropOn', 'put');

          scope.changeEmailForm.serverError = {};

          AccountService.changeEmail(scope.data.email)
            .then(function (value) {
              $rootScope.user.setUserEmail(value.email);

              scope.$emit('backdropOff', 'success');
            })
            .catch(function (response) {
              scope.$emit('backdropOff', 'error');

              if (response.status === 409) {
                scope.changeEmailForm.serverError.duplicate = true;
              } else {
                scope.changeEmailForm.serverError.generic = true;
              }
            });
        };

        scope.changePasswordModal = function(ev) {
          //var modal = $uibModal.open({
          //  templateUrl: 'views/profile/change-password-modal.html',
          //  controller: 'ChangePasswordCtrl'
          //});
          $mdDialog.show({
            controller: function($scope, $mdDialog) {
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.changePassword = function() {
                if (!$scope.changePasswordForm.$valid) {
                  return;
                }

                $scope.$emit('backdropOn', 'put');

                $scope.changePasswordForm.serverError = {};

                PasswordService.changePassword($scope.data.password, $scope.data.newPassword)
                  .then(function() {
                    $scope.$emit('backdropOff', 'success');
                    $mdDialog.cancel();
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
            },
            templateUrl: 'scripts/feature/profile/accountSetting/change-password.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true
          });
        };

        scope.cancelAccountModal = function(ev) {
          $mdDialog.show({
            controller: function($scope, $mdDialog) {
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.cancelAccount = function() {
                scope.$emit('backdropOn', 'delete');

                AccountService.deactivate().then(function() {
                  scope.$emit('backdropOff', 'success');
                  $rootScope.$emit('logout', false);
                }).catch(function() {
                  scope.$emit('backdropOff', 'error');
                  $rootScope.$emit('logout', false);
                });
              };
            },
            templateUrl: 'scripts/feature/profile/accountSetting/deactivate-account.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true
          });
        };

        scope.reset = function() {
          scope.data = angular.copy(oldData,{});
        };
      }
    }
  }]);
