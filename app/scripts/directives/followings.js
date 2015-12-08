'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:followings
 * @description
 * # followings
 */
angular.module('yeodjangoApp')
  .directive('followings', function () {
    return {
      templateUrl: '/views/followingstab.html',
      restrict: 'E',
      scope:{
        joinsPaginator:'='
      }
    };
  });
