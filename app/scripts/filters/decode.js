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
          if (Number(items[i].id) === code) {
            item = items[i].name;
          }
        }
      }
      return item
    };
  })
  .filter('decode_', function () {
    return function (items, code) {
      var item = "N/A";
      if (code) {
        code = Number(code);
        for (var i = 0; i < items.length; i++) {
          if (Number(items[i].code) === code) {
            item = items[i].name;
          }
        }
      }
      return item
    };
  })
  .filter('url', function () {
    var n_link;
    return function (link) {
      if (link) {
        var r = new RegExp("^http");

        if (r.test(link)) {
          n_link = link;
        } else {
          n_link = "https://" + link;
        }
      } else {
        n_link = link;
      }

      return n_link
    };
  });
