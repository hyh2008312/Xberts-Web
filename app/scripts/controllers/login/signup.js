'use strict';

angular.module('xbertsApp')
  .controller('SignupCtrl', ['$scope', '$rootScope', '$location', '$state', 'SystemConstant', 'SignupService',
    'AuthService', 'AnalyticsService', '$mdDialog',
    function($scope, $rootScope, $location, $state, SystemConstant, SignupService,
             AuthService, AnalyticsService, $mdDialog) {
      $scope.countryOptions = SystemConstant.COUNTRIES;
      $scope.loginError = {};

      $scope.signup = function() {
        if (!$scope.signupForm.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView($location.path() + '/confirm');

        $scope.signupForm.serverError = {};

        SignupService.signup($scope.firstName, $scope.lastName, $scope.email, $scope.password)
          .then(function(value) {
            return AuthService.login({
              username: value.email,
              password: $scope.password
            });
          })
          .then(function(value) {
            AuthService.loginRedirect();
          })
          .catch(function(httpResponse) {
            $scope.$emit('backdropOff', 'error');

            if (httpResponse.status === 409) {
              $scope.signupForm.serverError.userExist = true;
            } else {
              $scope.signupForm.serverError.generic = true;
            }
          });
    };

      $scope.showSignup = function(ev) {
        $mdDialog.show({
          controller: function(scope, $mdDialog) {
            scope.cancel = function() {
              $mdDialog.cancel();
            };
            scope.signup = function() {
              if (!scope.signupForm.$valid) {
                return;
              }

              $scope.$emit('backdropOn', 'post');

              AnalyticsService.sendPageView($location.path() + '/confirm');

              scope.signupForm.serverError = {};

              SignupService.signup(scope.firstName, scope.lastName, scope.email, scope.password)
                .then(function(value) {
                  return AuthService.login({
                    username: value.email,
                    password: scope.password
                  });
                })
                .then(function(value) {
                  AuthService.loginRedirect();
                  $mdDialog.cancel();
                })
                .catch(function(httpResponse) {
                  $scope.$emit('backdropOff', 'error');

                  if (httpResponse.status === 409) {
                    scope.signupForm.serverError.userExist = true;
                  } else {
                    scope.signupForm.serverError.generic = true;
                  }
                });
            };
          },
          templateUrl: 'scripts/feature/login/signup-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          disableParenScroll: true,
          onShowing: function(scope, element) {
            element.find('[xb-show-keyboard]').click();
          }
        });
      }
  }]);
