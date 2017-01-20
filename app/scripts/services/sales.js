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
      this.createDepositOrder = function (depositId, cartId) {
        return $resource(API_BASE_URL + '/sales/depositorders/')
          .save({
            deposit: depositId,
            shopGatewayCartId: cartId
          }).$promise;
      };
      this.getList = function (params) {
        return $resource(API_BASE_URL + '/sales/flashsaleorders/').get(params).$promise;
      };
    }]);
