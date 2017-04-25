'use strict';

angular.module('xbertsApp')
  .service('AddressService', ['$resource','API_BASE_URL',function ($resource,API_BASE_URL) {
    var AddressResource = $resource(API_BASE_URL + '/addresses/:id/', {id: '@id'},{'put': {method: 'PUT'}});

    var OrderResource = $resource(API_BASE_URL + '/gift_orders/:id/');

    this.getAddress = function() {
      return AddressResource.query().$promise;
    };

    this.create = function (params) {
      return AddressResource.save(params).$promise;
    };

    this.update = function (params) {
      return AddressResource.put(params).$promise;
    };

    this.createOrder = function (params) {
      return OrderResource.save(params).$promise;
    }

  }]);
