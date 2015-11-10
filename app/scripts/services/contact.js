'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Contact
 * @description
 * # Contact
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Contact',['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/resources/contacts/:id/', {id: '@id'});
  }]);
