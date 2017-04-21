'use strict';

angular.module('xbertsApp')
  .directive('tabsFixedTop', function () {
    return {
      restrict: 'A',
      scope:{
        parent: '=',
        item: '='
      },
      link: function (scope, element, attrs, ctrls) {
        var $delY = attrs.delTop;
        element.find('.' + scope.item).css('marginTop', '100px');
        element.parents('.xb-body-view').bind("scroll", function(e) {
          var $offsetY = element.parents('.' +scope.parent).offset().top;
          if(angular.element('[tabs-fixed-item]').length > 0) {
            var $marginTop = angular.element('[tabs-fixed-item]').offset().top;
            if($offsetY <= $delY) {
              element.find('.' + scope.item).css('marginTop', 0);
              element.css({
                position: 'fixed',
                top: $delY +'px'
              });
            } else {
              element.find('.' + scope.item).css('marginTop', $marginTop<0? 0:$marginTop);
              element.css({
                position: 'relative',
                top: 'auto'
              });
            }
          }
          else
          {
            if($offsetY <= $delY) {
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
          }
        });
      }
    }
  });
