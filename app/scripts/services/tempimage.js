'use strict';

angular.module('xbertsApp')
  .factory('TempImage', ['$resource', 'Configuration', function($resource, Configuration) {
    return function(tempId, tempImageId) {
      return $resource(Configuration.apiBaseUrl + '/upload/rest/temps/:tempId/images/:tempImageId/',
        {
          tempId: tempId,
          tempImageId: tempImageId
        });
    };
  }]);
