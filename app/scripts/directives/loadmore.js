'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:loadMore
 * @description
 * # loadMore
 */
angular.module('yeodjangoApp')
  .directive('loadMore', function () {
    return {
      template: '<div>' +
      '<i class="fa fa-spinner fa-spin"></i>' +
      '</div>',
      restrict: 'E',
      replace:true
    };
  });
