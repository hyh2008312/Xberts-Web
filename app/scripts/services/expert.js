'use strict';

angular.module('xbertsApp')
  .factory('Expert', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/experts/:id/', {id: '@id'});
  }])
  .factory('Influencer', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/influencers/:id/', {id: '@id'});
  }]);
