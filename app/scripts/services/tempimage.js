'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.TempImage
 * @description
 * # TempImage
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
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
