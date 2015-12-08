'use strict';

/**
 * @ngdoc filter
 * @name xbertsApp.filter:narrow
 * @function
 * @description
 * # narrow
 * Filter in the xbertsApp.
 */
angular.module('xbertsApp')
  .filter('narrow', function () {
    var innn = function (a, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == a) {
          return true;
        }
      }

    };
    return function (items, inStr) {
      var inArray = inStr.split(',');
      var fItems = [];
      angular.forEach(items, function (item, i) {
        if (innn(item.id, inArray)) {
          fItems.push(item);
        }
      });
      return fItems
    };
  });
