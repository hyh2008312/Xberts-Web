'use strict';

angular.module('xbertsApp')
  .directive('share', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        title: '@title',
        description: '@description',
        image: '@image',
        url: '@url'
      },
      templateUrl: 'views/directive/share.html'
    };
  });
