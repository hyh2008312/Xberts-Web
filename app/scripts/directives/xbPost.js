'use strict';

angular.module('xbertsApp')
  .directive('xbPost', [function() {
    return {
      templateUrl: 'views/directive/xb-post.html',
      replace: true,
      restrict: 'E',
      scope:{},
      link: function postLink(scope, element, attrs) {
        scope.isPopupOpen = false;

        scope.onPopup = function() {
          scope.isPopupOpen = !scope.isPopupOpen;
        };
      }
    };
  }]);
