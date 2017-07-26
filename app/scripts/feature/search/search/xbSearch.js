'use strict';

angular.module('xbertsApp')
  .directive('xbSearch', ['$mdDialog',function ($mdDialog) {
    return {
      templateUrl: "scripts/feature/search/search/xb-search.html",
      scope: {

      },
      link: function (scope, element, attrs, ctrls) {

        scope.openSearch = function(ev) {
          $mdDialog.show({
            controller: function(scope, $mdDialog) {
              scope.search = null;
              scope.cancel = function() {
                scope.search = null;
              };
              scope.submit = function() {

              };
            },
            templateUrl: 'scripts/feature/search/search/xb-search-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true
          });
        }
      }
    }
  }]);
