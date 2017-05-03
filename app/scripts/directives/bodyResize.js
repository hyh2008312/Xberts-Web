'use strict';

angular.module('xbertsApp')
  .directive('bodyResize',['$window',function ($window) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
      },
      link: function (scope, element, attr, ctrl) {
        var resizeBody = function() {
          element.height(angular.element($window).height());
        };
        angular.element($window).on('resize', resizeBody);
        resizeBody();
      }
    };
  }]);
