'use strict';

angular.module('xbertsApp')
  .factory('ProfileReviewer', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/reviewers/:id/',
      {id: '@user_id'},
      {'put': {method: 'PUT'}});
  }])
  .factory('BuyerProfile', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/profile/buyers/:id/',
      {id: '@id'},
      {'put': {method: 'PUT'}});
  }]);
