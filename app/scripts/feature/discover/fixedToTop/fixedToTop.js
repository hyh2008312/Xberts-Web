angular.module('xbertsApp')
  .directive('fixedToTop', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs, ctrls) {
        var $delY = attrs.delTop;
        var $offsetY = attrs.offsetTop;
        angular.element('.xb-body-view').bind("scroll", function(e) {
          if(e.currentTarget.scrollTop >= $offsetY) {
            element.css({
              position: 'fixed',
              top: $delY +'px'
            });
          } else {
            element.css({
              position: 'relative',
              top: 'auto'
            });
          }
        });
      }
    }
  });
