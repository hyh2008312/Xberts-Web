'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.TempImage
 * @description
 * # TempImage
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('TempImage', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return function (tempId, tempImageId) {
      return $resource('/upload/rest/temps/:tempId/images/:tempImageId/',
        {
          tempId: tempId,
          tempImageId: tempImageId
        });
    };
  }]);
