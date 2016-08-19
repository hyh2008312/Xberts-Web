'use strict';

angular.module('xbertsApp')
  .factory('ProfileReviewer', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/xberts/reviewers/:id/',
      {id: '@user_id'},
      {'put': {method: 'PUT'}});
  }]);
