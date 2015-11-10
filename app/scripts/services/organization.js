'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.organization
 * @description
 * # organization
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
    .factory('Organization', ['$resource', function ($resource) {
        // Service logic
        // ...


        // Public API here
        return $resource('/xberts/rest/organizations/:id/', {id: '@id'}, {'put': {method: 'PUT'}});
    }]);
