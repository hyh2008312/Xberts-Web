'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ProfileReviewer
 * @description
 * # ProfileReviewer
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ProfileReviewer', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/xberts/rest/reviewers/:id/', {id: '@user_id'}, {'put': {method: 'PUT'}});
  }]);
