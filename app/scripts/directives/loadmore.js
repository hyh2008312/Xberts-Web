'use strict';

angular.module('xbertsApp')
  .directive('loadMore', function () {
    return {
      template: '<div>' +
      '<i class="fa fa-spinner fa-spin"></i>' +
      '</div>',
      restrict: 'E',
      replace:true
    };
  });
