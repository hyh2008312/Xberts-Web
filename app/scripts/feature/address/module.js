'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.shippingAddress', {
      url: '/shippingAddress?giftId&giftPoints',
      templateUrl: 'scripts/feature/address/address.html',
      controller: 'AddressCtrl',
      resolve: {
        address: ['AddressService',function(AddressService) {
          return AddressService.getAddress();
        }]
      }
    })
  }]);
