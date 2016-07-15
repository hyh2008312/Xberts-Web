'use strict';

angular.module('xbertsApp')
  .factory('Expert', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/xberts/rest/experts/:id/', {id: '@id'});
  }])
  .factory('Influencer', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/xberts/rest/influencers/:id/', {id: '@id'});
  }]);
