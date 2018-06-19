'use strict';

angular.module('xbertsApp')
  .directive('xbPost', function() {
    return {
      templateUrl: 'views/directive/xb-post.html',
      replace: false,
      restrict: 'E',
      scope:{
        onClose: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.isPopupOpen = false;

        scope.onPopup = function() {
          scope.isPopupOpen = !scope.isPopupOpen;
        };
      }
    };
  });
