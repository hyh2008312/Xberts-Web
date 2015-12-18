'use strict';

angular.module('xbertsApp')
  .factory('S', ['$window', function($window) {
    return $window.S;
  }]);

