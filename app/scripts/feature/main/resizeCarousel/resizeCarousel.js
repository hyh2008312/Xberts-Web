angular.module('xbertsApp')
  .directive('resizeCarousel', ['$window', function($window) {
    return {
      restrict: 'A',
      scope: {
        ratio: '=',
        parents: '@',
        elementHeight: '='
      },
      link: function (scope, element, attrs, ctrls) {
        var resetSize = function() {
          if(angular.element($window).width() < 960) {
            var $width = element.closest('.' + scope.parents).width();
            element.closest('.' + scope.parents).height($width / scope.ratio);
            element.height($width / scope.ratio);
          }
          else
          {
            var resetSize = function() {
              element.closest('.' + scope.parents).height(scope.elementHeight);
              element.height(scope.elementHeight);
            };
            resetSize();
          }
        };
        resetSize();
        angular.element($window).bind('resize', resetSize);
      }
    }
  }]);
