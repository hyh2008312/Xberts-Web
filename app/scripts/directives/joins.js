'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:joins
 * @description
 * # joins
 */
angular.module('yeodjangoApp')
  .directive('joins', function () {
    return {
      templateUrl: '/views/joinstab.html',
      restrict: 'E',
      scope:{
        joinsPaginator:'='
      }
    };
  });
