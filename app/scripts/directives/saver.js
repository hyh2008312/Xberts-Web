'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:saver
 * @description
 * # saver
 */
angular.module('yeodjangoApp')
  .directive('saver',  function () {
    return {
      templateUrl:'/views/saver.html',
      require: '^join',
      restrict: 'E'
    };
  });
