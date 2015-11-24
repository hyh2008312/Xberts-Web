'use strict';

/**
 * @ngdoc filter
 * @name yeodjangoApp.filter:split
 * @function
 * @description
 * # split
 * Filter in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .filter('split', function () {
    return function (input) {
      return input.split(",");
    };
  });
