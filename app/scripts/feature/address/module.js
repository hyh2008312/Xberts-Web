'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.protected.shippingAddress', {
      url: '/shippingAddress?giftId&giftPoints',
      templateUrl: 'scripts/feature/address/address.html',
      controller: 'AddressCtrl',
      resolve: {
        address: ['protectedAuthCheck','AddressService',function(protectedAuthCheck,AddressService) {
          return AddressService.getAddress();
        }]
      }
    })
  }]);
