'use strict';

angular.module('xbertsApp')
  .service('Sales', ['$resource', 'API_BASE_URL',
    function ($resource, API_BASE_URL) {
    this.createOrder = function (saleId, quantity, cartId) {
      return $resource(API_BASE_URL + '/sales/flashsaleorders/')
        .save({
          flashSale: saleId,
          quantity: quantity,
          shopGatewayCartId: cartId
        }).$promise;
    };
  }]);
