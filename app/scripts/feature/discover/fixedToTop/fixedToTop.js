angular.module('xbertsApp')
  .directive('fixedToTop', ['$window',function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs, ctrls) {
        var $offsetY = element.offset().top;
        var $delY = attrs.offsetTop;
        angular.element($window).bind("scroll", function(e) {
          if(e.currentTarget.pageYOffset >= $offsetY - $delY) {
            element.addClass('category__fixed');
          } else {
            element.removeClass('category__fixed');
          }
        });
      }
    }
  }]);
