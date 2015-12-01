'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.Expert
 * @description
 * # Expert
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Expert',['$resource', function ($resource) {
    return $resource('/xberts/rest/experts/:id/', {id: '@id'});
  }]);
