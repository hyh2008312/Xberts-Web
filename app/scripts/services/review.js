'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Review
 * @description
 * # Review
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Review', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/review/reviews/:id/', {id: '@id'});
  }]);
