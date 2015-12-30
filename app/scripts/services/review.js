'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.Review
 * @description
 * # Review
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Review', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/review/reviews/:id/', {id: '@id'});
  }])
  .factory('ProjectReview', ['$resource', function ($resource) {
    return $resource('/review/projectreviews/:id/', {id: '@id'});
  }]);
