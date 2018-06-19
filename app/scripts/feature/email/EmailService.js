'use strict';

angular.module('xbertsApp')
  .service('EmailService', ['$resource','API_BASE_URL',function ($resource,API_BASE_URL) {
    var UnsubscribeResource = $resource(API_BASE_URL + '/edm/unsubscribe/');


    this.unsubscribe = function(params) {
      return UnsubscribeResource.get(params).$promise;
    };


  }]);
