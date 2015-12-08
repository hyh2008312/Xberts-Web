'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.distribution
 * @description
 * # distribution
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
    .factory('Distribution', ['$resource', function ($resource) {
        // Service logic
        // ...

        // Public API here
        return $resource('/projects/rest/requests/:id/', {id: '@id'},{'put': {method: 'PUT'}});
    }]);
