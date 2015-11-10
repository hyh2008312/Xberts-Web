'use strict';

/**
 * @ngdoc filter
 * @name yeodjangoApp.filter:trust
 * @function
 * @description
 * # trust
 * Filter in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .filter('trust', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
