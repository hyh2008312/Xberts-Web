'use strict';

/**
 * @ngdoc filter
 * @name yeodjangoApp.filter:decode
 * @function
 * @description
 * # decode
 * Filter in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
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
