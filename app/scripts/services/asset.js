'use strict';

angular.module('xbertsApp')
  .service('Asset', ['$resource', 'Configuration', function ($resource, Configuration) {
    this.createImageAsset = function(url, type) {
      return $resource(Configuration.apiBaseUrl + '/upload/imageassets/')
        .save({
          url: url,
          type: type
        }).$promise;
    };

    this.createVideoAsset = function(url, type) {
      return $resource(Configuration.apiBaseUrl + '/upload/videoassets/')
        .save({
          url: url,
          type: type
        }).$promise;
    };
  }]);
