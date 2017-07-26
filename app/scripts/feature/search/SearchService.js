'use strict';

angular.module('xbertsApp')
  .service('SearchService', ['$resource','API_BASE_URL',function ($resource,API_BASE_URL) {
    var SearchResource = $resource(API_BASE_URL + '/search/:id/');

    this.getSearch = function(params) {
      return SearchResource.get(params).$promise;
    };

  }]);
