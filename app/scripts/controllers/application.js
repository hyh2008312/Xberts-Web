'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', '$auth', '$interval', 'AuthService',
    'SatellizerPopup',
    function($scope, $rootScope, $state, $auth, $interval, AuthService,
             SatellizerPopup) {
      $scope.linkedinError = {};

      $scope.logout = function() {
        $rootScope.$emit('logout', true);
      };

      $scope.linkedinLogin = function(form) {
        $scope.$emit('backdropOn', 'post');

        $scope.linkedinError = {};

        var authPromise = $auth.authenticate('linkedin');

        authPromise.then(function(response) {
            return AuthService.exchangeLinkedinToken(response.data.access_token);
          })
          .then(function(value) {
            AuthService.loginRedirect();
          })
          .catch(function(response) {
            $scope.$emit('backdropOff', 'error');

            form.serverError = {linkedinError: true};
          });

        // Need to hide spinner when linkedin popup window is manually closed. In this case social auth promise
        // has not been resolved.
        var polling = $interval(function() {
          if (!SatellizerPopup.popupWindow || SatellizerPopup.popupWindow.closed ||
               SatellizerPopup.popupWindow.closed === undefined) {
            $interval.cancel(polling);

            if (authPromise.$$state.status === 0) {
              $scope.$emit('backdropOff', 'close');
            }
          }
        }, 1000);
      };
    }]);

