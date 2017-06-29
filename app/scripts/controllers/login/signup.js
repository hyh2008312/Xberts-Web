'use strict';

angular.module('xbertsApp')
  .controller('SignupCtrl', ['$scope', '$rootScope', '$location', '$state', 'SystemConstant', 'SignupService',
    'AuthService', 'AnalyticsService', '$mdDialog','$stateParams',
    function($scope, $rootScope, $location, $state, SystemConstant, SignupService,
             AuthService, AnalyticsService, $mdDialog,$stateParams) {
      $scope.countryOptions = SystemConstant.COUNTRIES;
      $scope.loginError = {};

      $scope.linkedinLogin = function() {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/linkedinlogin');

        AuthService.linkedinLogin();
      };

      $scope.facebookLogin = function(loginError) {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/facebooklogin');

        AuthService.facebookLogin()
          .then(function () {
            $scope.$emit('backdropOff', 'success');
            if($rootScope.user.getUserEmail()) {
              AuthService.loginRedirect();
            }
          })
          .catch(function (response) {
            $scope.$emit('backdropOff', 'error');

            if (response === 'missing_permission') {
              loginError.facebookPermissionError = true;
            } else {
              loginError.facebookError = true;
            }
          });
      };

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

      $scope.showSignup = function(obj, ev) {
        $mdDialog.show({
          controller: function(scope, $mdDialog) {
            scope.showTitle = !obj? false:true;

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
          disableParenScroll: true
        });
      };

      if( $stateParams.tab) {
        $scope.showTitle = $stateParams.tab;
        $scope.showSignup($stateParams.tab);
      }

      var title = 'Xberts – Sign up now to get started';
      var description = "Join Xberts community so you can try the coolest products for free and stay up-to-date on the latest tech gadgets and deals. Very easy to sign up!";
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
