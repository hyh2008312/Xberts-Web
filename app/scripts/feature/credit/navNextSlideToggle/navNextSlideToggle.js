angular.module('xbertsApp')
  .directive('navNextSlideToggle', ['$window',function ($window) {
    return {
      restrict: 'A',
      scope: {
        toggle: '=toggle',
        toggleElement: '=',
        parent: '=',
        activeClass: '=',
        touchClass: '=',
        index: '='
      },
      link: function (scope, element, attrs, ctrls) {
        angular.element(scope.parent ? scope.parent + ':eq('+scope.index+')': element).bind('touchstart', function() {
          angular.element(scope.parent+':eq('+scope.index+')').addClass(scope.touchClass);
        }).bind('touchend', function() {
          angular.element(scope.parent+':eq('+scope.index+')').removeClass(scope.touchClass);
        }).bind('click', function() {
          scope.toggle = !scope.toggle;
          angular.element(scope.parent+':eq('+scope.index+')').removeClass(scope.activeClass);
          if(scope.toggle){
            angular.element(scope.parent+':eq('+scope.index+')').addClass(scope.activeClass);
          } else {
            angular.element(scope.parent+':eq('+scope.index+')').removeClass(scope.activeClass);
          }
          angular.element(scope.toggleElement).eq(scope.index).stop().slideToggle();
        });
      }
    }
  }]);
