'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.organization
 * @description
 * # organization
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
    .factory('Organization', ['$resource', function ($resource) {
        // Service logic
        // ...


        // Public API here
        return $resource('/xberts/rest/organizations/:id/', {id: '@id'}, {'put': {method: 'PUT'}});
    }]);
