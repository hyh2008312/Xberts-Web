'use strict';

angular.module('xbertsApp')
  .factory('urlUtil', function () {
    function parseQueryParams(paramStr) {
      var params = {};

      angular.forEach((paramStr || "").split('&'), function (keyValue) {
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
  })
  .service('Utils', function () {
    this.parseCommaStringForTagInput = function (commaString) {
      var tags = [];
      if (commaString === undefined || commaString === null || commaString === "") {
        return tags;
      } else {
        var tagsTemp = commaString.split(',');
        for (var i = 0; i < tagsTemp.length; i++) {
          var tag = {};
          tag.text = tagsTemp[i];
          tags.push(tag);
        }
        return tags;
      }
    };
    this.convertTagsInputToCommaString = function (tagsInput) {
      var tags = [];
      for (var i = 0; i < tagsInput.length; i++) {
        tags.push(tagsInput[i].text);
      }
      return tags.join(',');
    };
  })
;

