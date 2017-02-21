'use strict';

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
    return function (code, dicts,_default) {
      var name = _default || '';
      if (code) {
        for (var i = 0; i < dicts.length; i++) {
          if (dicts[i].code === code) {
            name = dicts[i].name;
          }
        }
      }
      return name
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
  })
  .filter('doubleDigit', function () {
    return function (number) {
      if (number < 10) {
        return '0' + number.toString();
      }
      return number
    };
  })
  .filter('percentage', function () {
    return function (number) {
       var v= Number(number);
      return isNaN(v) ? 0 : Math.round(number * 100);
    };
  });
