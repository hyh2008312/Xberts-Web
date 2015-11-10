'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Expert
 * @description
 * # Expert
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Expert',['$resource', function ($resource) {
    return $resource('/xberts/rest/experts/:id/', {id: '@id'});
  }]);
