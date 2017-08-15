'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope',
    '$timeout', '$mdSidenav','AnalyticsService', 'BrowserUtil',
    function($scope, $rootScope, $timeout, $mdSidenav, AnalyticsService, BrowserUtil) {
      $scope.userDropdownStatus = {
        isopen: false
      };

      $scope.linkedinError = {};

      $scope.errorCheck = function(form, field) {
        if ((form.$submitted || form[field].$touched) && form[field].$invalid) {
          return true;
        } else {
          return false;
        }
      };

      $scope.login = function() {
        if(!$rootScope.user.authRequired()) {
          return;
        }
      };

      $scope.logout = function() {
        $mdSidenav('left').close();
        $scope.isPopupOpen = false;
        $scope.userDropdownStatus = false;

        AnalyticsService.sendPageView('/logout');

        $rootScope.$emit('logout', true);
      };

      $scope.toggleLeft = buildDelayedToggler('left');

      function debounce(func, wait, context) {
        var timer;

        return function debounced() {
          var context = $scope,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }

      function buildDelayedToggler(navID) {
        return debounce(function() {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav(navID).toggle();
        }, 200);
      }

      $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close();
      };

      $scope.isPopupOpen = false;

      $scope.onPopup = function() {
        $scope.isPopupOpen = !$scope.isPopupOpen;
      };

      $scope.isIos = BrowserUtil.isIos();
    }]);
