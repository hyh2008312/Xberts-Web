'use strict';

angular.module('xbertsApp')
  .service('ExchangeRateService', ['$http','$sce','$rootScope',
    function ($http,$sce,$rootScope) {
      var self = this;

      var url = $sce.trustAsResourceUrl("https://query.yahooapis.com/v1/public/yql");

      // @params ('CNYUSD','EURUSD','INRUSD')
      this.country = 'INRUSD';

      self.getRate = function () {
        $http.jsonp(url,{params:{
          q:'select * from yahoo.finance.xchange where pair in ("'+self.country+'")',
          format:'json',
          diagnostics:true,
          env:'store://datatables.org/alltableswithkeys'
        },jsonpCallbackParam: 'callback'}).then(function(data) {
          $rootScope.exchangeRate = data.data.query.results.rate.Rate;
        });
      };

    }]);
