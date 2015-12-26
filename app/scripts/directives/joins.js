'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:joins
 * @description
 * # joins
 */
angular.module('xbertsApp')
  .directive('joins', function () {
    return {
      templateUrl: 'views/joinstab.html',
      restrict: 'E',
      scope:{
        joinsPaginator:'='
      }
    };
  });
