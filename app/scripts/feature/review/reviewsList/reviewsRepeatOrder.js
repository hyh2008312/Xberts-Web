'use strict';

angular.module('xbertsApp')
  .directive('reviewsRepeatOrder', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        index: '='
      },
      link: function (scope, element, attrs, ctrls) {

        element.css({
          '-webkit-box-ordinal-group': scope.index,
          '-webkit-order': scope.index,
          'order': scope.index
        });

      }
    };
  });
