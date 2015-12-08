'use strict';

/**
 * @ngdoc filter
 * @name xbertsApp.filter:decode
 * @function
 * @description
 * # decode
 * Filter in the xbertsApp.
 */
angular.module('xbertsApp')
  .filter('decode', function () {
    return function (items, code) {
      var item = "";
      if (code) {
        code = Number(code);
        for (var i = 0; i < items.length; i++) {
          if (items[i].id === code) {
            item = items[i].name;
          }
        }
      }
      return item
    };
  });
