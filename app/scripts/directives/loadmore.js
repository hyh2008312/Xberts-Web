'use strict';

angular.module('xbertsApp')
  .directive('loadMore', function () {
    return {
      template: '<div class="xb-loading" layout="row" layout-align="center center">' +
        '<md-progress-circular class="md-dark-third" md-diameter="{{diameter || 40}}" md-mode="indeterminate"></md-progress-circular>' +
      '</div>',
      restrict: 'E',
      replace: true,
      scope: {
        diameter : '='
      }
    };
  });
