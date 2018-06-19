'use strict';

angular.module('xbertsApp')
  .factory('$', ['$window', function($window) {
    return $window.$;
  }])
  .factory('_', ['$window', function($window) {
    return $window._;
  }])
  .factory('S', ['$window', function($window) {
    return $window.S;
  }]);
