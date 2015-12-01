'use strict';

angular.module('xbertsApp')
  .factory('urlUtil', function() {
    function parseQueryParams(paramStr) {
      var params = {};

      angular.forEach((paramStr || "").split('&'), function(keyValue) {
        if (keyValue) {
          var keyValueSplit = keyValue.split('=');
          params[keyValueSplit[0]] = keyValueSplit[1];
        }
      });

      return params;
    }

    return {
      parseQueryParams: parseQueryParams
    };
  });
