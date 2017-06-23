'use strict';

angular.module('xbertsApp')
  .service('ExchangeRateService', ['$resource', '$rootScope', '$state', 'growl', 'Review', 'Report',
    function ($resource, $rootScope, $state, growl, Review, Report) {
      var self = this;

      //var ExchangeResource = $resource('https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json');
      //var ExchangeResource = $resource('https://forex.1forge.com/1.0.1/quotes');
      var ExchangeResource = $resource('http://apilayer.net/api/live');

      self.currency = {
        access_key:'aa578d92b13531d5dd2283499e5a07aa',
        currencies: 'INR'
      };

      self.getRate = function (currency) {
        return ExchangeResource.get(self.currency).$promise.then(function(data) {
          console.log(data);
        });
      };

    }]);
