'use strict';

angular.module('xbertsApp')
  .directive('tabsFixedTop', function () {
    return {
      restrict: 'A',
      scope:{
        parent: '=',
        item: '=',
        reverse: '='
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
              $marginTop = scope.reverse ? $offsetY - $marginTop + 56 : $marginTop;
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
  })
  .directive('shareFixedButton', ['$window',function ($window) {
    return {
      restrict: 'A',
      scope:{
        item : '=',
        content : '=',
        content1 : '=',
        delta: '='
      },
      link: function (scope, element, attrs, ctrls) {
        var resize = function() {
          var left = angular.element('.' + scope.item).offset().left + angular.element('.' + scope.item).width();
          element.hide();
          if(angular.element('.' + scope.content).offset().top - 400 < element.offset().top &&
            angular.element('.' + scope.content1).offset().top - 132 - 400 > element.offset().top) {
            element.css({
              top: angular.element($window).height() - 50 - 132,
              left : left + (scope.delta? scope.delta : 0),
              display : 'block'
            });
          } else {
            element.css({
              top: angular.element($window).height() - 50 - 132,
              left : left + (scope.delta? scope.delta : 0),
              display : 'none'
            });
          }
        };
        resize();
        angular.element($window).off("resize", resize);
        angular.element('.xb-body-view').off("scroll", resize);
        angular.element($window).on("resize", resize);
        angular.element('.xb-body-view').on("scroll", resize);
      }
    }
  }]);
