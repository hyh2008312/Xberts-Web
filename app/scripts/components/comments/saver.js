'use strict';

angular.module('xbertsApp')
  .directive('saver',  function () {
    return {
      templateUrl:'views/directive/saver.html',
      require: '^join',
      restrict: 'E'
    };
  });
