'use strict';

angular.module('xbertsApp')
  .factory('DealsFactory', ['$location','$timeout','$mdSidenav','$mdDialog',
    function ($location,$timeout,$mdSidenav,$mdDialog) {

    var self = this;

    this.updateUrl = function ($scope,array) {
      setTimeout(function () {
        $scope.$apply(function () {
          $location.search('tab', $scope.selectedIndex>=0?array[$scope.selectedIndex.toString()].value:null);
        });
      }, 0);
    };

    this.updateActiveTabOnSearch = function(scope, array) {
      var tab = $location.search().tab;
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

    this.openSignUp = function(timer,ev) {
      $mdDialog.show({
        controller: function(scope, $mdDialog) {

          scope.cancel = function() {
            $mdDialog.cancel();
          };
          scope.askQuestion = function(question) {
          };
        },
        templateUrl: 'scripts/feature/ask/recommendationPost/recommendation-post-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        disableParenScroll: true
      });
    };

    return this;
  }]);
