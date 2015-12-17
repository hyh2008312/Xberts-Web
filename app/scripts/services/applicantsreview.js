'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.applicantsreview
 * @description
 * # applicantsreview
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Applicantsreview',['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/review/applicantsreview/:id/', {id: '@id'});
  }]);
