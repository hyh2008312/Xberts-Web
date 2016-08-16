'use strict';

angular.module('xbertsApp')
  .filter('trust', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])
  .filter('length', function () {
    return function (array) {
      return array.length;
    };
  });
