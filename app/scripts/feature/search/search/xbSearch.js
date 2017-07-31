'use strict';

angular.module('xbertsApp')
  .directive('xbSearch', ['$mdDialog','$state','SearchFactory',function ($mdDialog, $state, SearchFactory) {
    return {
      templateUrl: "scripts/feature/search/search/xb-search.html",
      scope: {

      },
      link: function (scope, element, attrs, ctrls) {

        scope.openSearch = function(ev) {
          $mdDialog.show({
            controller: function(scope, $mdDialog) {
              scope.search = SearchFactory.keywords;
              scope.cancel = function() {
                scope.search = null;
              };
              scope.submit = function() {
                if(scope.search != null) {
                  $state.go('application.search', {question:scope.search}, {reload:true});
                }
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
