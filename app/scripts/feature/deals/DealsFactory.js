'use strict';

angular.module('xbertsApp')
  .factory('DealsFactory', ['$location','$timeout','$mdSidenav',function ($location,$timeout,$mdSidenav) {

    var self = this;

    this.updateUrl = function ($scope,array) {
      setTimeout(function () {
        $scope.$apply(function () {
          $location.search('tab', array[$scope.selectedIndex.toString()].value);
        });
      }, 0);
    };

    this.updateActiveTabOnSearch = function(scope, array) {
      var tab = $location.search().tab || array[0].value;
      scope.selectedIndex = parseInt(array.findIndex(function(x) {
        return x.value == tab;
      }));
    };

    this.debounce = function(func, wait, context) {
      var timer;

      return function debounced() {
        var args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    };

    this.buildDelayedToggler = function(navID, context) {
      return self.debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID).toggle();
      }, 200, context);
    };

    return this;
  }]);
