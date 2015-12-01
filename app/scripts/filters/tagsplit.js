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
    var tagsSplit=function (tagstring) {
      if(tagstring===undefined || tagstring==="" || tagstring===[]){
        return "";
      }
      var newTagsString;
      if(typeof (tagstring)==="string"){
        var tags=tagstring.split(',');
        newTagsString=tags.join("  #");
      }
      if(tagstring instanceof Array){
        newTagsString=tagstring.join("  #");
      }
      return "#"+newTagsString;

    };
    return tagsSplit;
  });
