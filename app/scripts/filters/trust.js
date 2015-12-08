'use strict';

/**
 * @ngdoc filter
 * @name xbertsApp.filter:trust
 * @function
 * @description
 * # trust
 * Filter in the xbertsApp.
 */
angular.module('xbertsApp')
  .filter('trust', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
