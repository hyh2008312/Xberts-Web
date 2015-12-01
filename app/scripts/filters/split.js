'use strict';

/**
 * @ngdoc filter
 * @name xbertsApp.filter:split
 * @function
 * @description
 * # split
 * Filter in the xbertsApp.
 */
angular.module('xbertsApp')
  .filter('split', function () {
    return function (input) {
      return input.split(",");
    };
  });
