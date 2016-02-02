'use strict';

angular.module('xbertsApp')
  .factory('_', ['$window', function($window) {
    return $window._;
  }]);
