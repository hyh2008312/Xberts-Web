'use strict';

angular.module('xbertsApp')
  .service('Asset', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    this.createImageAsset = function(url, type) {
      return $resource(API_BASE_URL + '/upload/imageassets/')
        .save({
          url: url,
          type: type
        }).$promise;
    };

    this.createVideoAsset = function(url, type) {
      return $resource(API_BASE_URL + '/upload/videoassets/')
        .save({
          url: url,
          type: type
        }).$promise;
    };
  }]);
