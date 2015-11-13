'use strict';

/**
 * @ngdoc filter
 * @name yeodjangoApp.filter:tagsplit
 * @function
 * @description
 * # tagsplit
 * Filter in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .filter('tagsplit', function () {
    var tagsSplit=function (tagstring) {
      if(tagstring===undefined || tagstring===""){
        return "";
      }
      var tags=tagstring.split(',');
      var newTagsString=tags.join("  #");

      return "#"+newTagsString;
    };
    return tagsSplit;
  });
