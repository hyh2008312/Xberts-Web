'use strict';

/**
 * @ngdoc filter
 * @name xbertsApp.filter:tagsplit
 * @function
 * @description
 * # tagsplit
 * Filter in the xbertsApp.
 */
angular.module('xbertsApp')
  .filter('tagsplit', function () {
    var tagsSplit = function (tagstring) {
      if (tagstring === undefined || tagstring === "" || tagstring === []) {
        return "";
      }
      var newTagsString;
      var prefix = '#';
      var delimiter = " " + prefix;
      if (typeof (tagstring) === "string") {
        var tags = tagstring.split(',');
        newTagsString = tags.join(delimiter);
      }
      if (tagstring instanceof Array) {
        newTagsString = tagstring.join(delimiter);
      }
      return prefix + newTagsString;

    };
    return tagsSplit;
  });
