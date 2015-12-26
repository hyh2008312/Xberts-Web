'use strict';

angular.module('xbertsApp')
  .factory('ProfileReviewer', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/reviewers/:id/',
      {id: '@user_id'},
      {'put': {method: 'PUT'}});
  }]);
