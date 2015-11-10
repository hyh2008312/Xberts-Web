'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.distribution
 * @description
 * # distribution
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
    .factory('Distribution', ['$resource', function ($resource) {
        // Service logic
        // ...

        // Public API here
        return $resource('/projects/rest/requests/:id/', {id: '@id'},{'put': {method: 'PUT'}});
    }]);
