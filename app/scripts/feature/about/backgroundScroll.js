'use strict';

angular.module('xbertsApp')
  .directive('backgroundScroll', ['$window',function($window) {
    return {
      restrict: 'A',
      scope: {
        offsetDel: '='
      },
      link: function (scope, element, attrs, ctrls) {
        var topList = [];
        var viewHeight = angular.element($window).height();
        angular.element(element).find('div').each(function(i, e) {
          var speed = 0.9;
          var fontSize = parseInt(angular.element(e).css('fontSize'));
          switch (fontSize) {
            case 240:
                  speed = 1.25;
                  break;
            case 320:
                  speed = 1.5;
                  break;
            case 520:
                  speed = 1.75;
                  break;
            case 640:
                  speed = 2.5;
                  break;
          }
          topList.push({
            height: parseInt(angular.element(e).css('top')) - viewHeight,
            delY: speed
          });
        });
        angular.element('.xb-body-view').bind("scroll", function(e) {
          var offsetTop = angular.element(element).offset().top;
          if(offsetTop <= viewHeight && offsetTop >= -584) {
            angular.element(element).find('div').each(function(i, e) {
              angular.element(e).css('top',(topList[i].height - (offsetTop - viewHeight) * topList[i].delY) + 'px');
            });
          }
        });
      }
    }
  }]);
