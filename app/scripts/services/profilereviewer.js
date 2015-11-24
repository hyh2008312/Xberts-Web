'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.ProfileReviewer
 * @description
 * # ProfileReviewer
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('ProfileReviewer', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/xberts/rest/reviewers/:id/', {id: '@user_id'}, {'put': {method: 'PUT'}});
  }]);
