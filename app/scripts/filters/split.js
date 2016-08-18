'use strict';

angular.module('xbertsApp')
  .filter('split', function () {
    return function (input) {
      return input.split(",");
    };
  });
