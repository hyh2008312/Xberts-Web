'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:saver
 * @description
 * # saver
 */
angular.module('xbertsApp')
  .directive('saver',  function () {
    return {
      templateUrl:'views/saver.html',
      require: '^join',
      restrict: 'E'
    };
  });
