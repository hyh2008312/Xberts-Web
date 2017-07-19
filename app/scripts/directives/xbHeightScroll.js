'use strict';

angular.module('xbertsApp')
  .directive('xbHeightScroll', ['$window','$mdMedia',function($window,$mdMedia) {
    return {
      restrict: 'A',
      replace: false,
      scope: {},
      link: function postLink(scope, element, attrs) {
        var resizeBody = function() {
          if(!$mdMedia('xs')) {
            var height = angular.element($window).height() - attrs.delHegiht;
            element.css({
              height: height,
              overflow: 'scroll'
            });
          } else {
            element.removeAttr('style');
          }
        };
        angular.element($window).on('resize', resizeBody);
        resizeBody();
      }
    };
  }])
