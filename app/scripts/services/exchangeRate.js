'use strict';

angular.module('xbertsApp')
  .service('ExchangeRateService', ['$resource', '$rootScope', '$state', 'growl', 'Review', 'Report',
    function ($resource, $rootScope, $state, growl, Review, Report) {
      var self = this;

      //var ExchangeResource = $resource('https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json');
      //var ExchangeResource = $resource('https://forex.1forge.com/1.0.1/quotes');
      var ExchangeResource = $resource('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22INRUSD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=');

      self.getRate = function () {
        return ExchangeResource.get().$promise.then(function(data) {
          console.log(data);
        });
      };

    }]);
