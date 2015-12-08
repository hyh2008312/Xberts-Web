'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:followings
 * @description
 * # followings
 */
angular.module('xbertsApp')
  .directive('followings', function () {
    return {
      templateUrl: '/views/followingstab.html',
      restrict: 'E',
      scope:{
        joinsPaginator:'='
      }
    };
  });
