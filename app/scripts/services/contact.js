'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.Contact
 * @description
 * # Contact
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Contact',['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/resources/contacts/:id/', {id: '@id'});
  }]);
