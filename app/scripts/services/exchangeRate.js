'use strict';

angular.module('xbertsApp')
  .service('ExchangeRateService', ['$http','$sce','$rootScope','$resource','API_BASE_URL',
    function ($http,$sce,$rootScope,$resource,API_BASE_URL) {
      var self = this;

      var IpResource = $resource(API_BASE_URL + '/ip/');

      var url = $sce.trustAsResourceUrl("http://api.fixer.io/latest");

      // @params ('CNYUSD','EURUSD','INRUSD')
      this.country = '';

      self.getIp = function() {
        return IpResource.get().$promise;
      };

      self.getRate = function () {
        self.getIp().then(function(data) {
          $rootScope.country = data.country;
        });
        $http.jsonp(url,{params:{
          base:'USD',
          symbols: 'INR'
        },jsonpCallbackParam: 'callback'}).then(function(data) {
          $rootScope.exchangeRate = 1 / data.data.rates.INR;
        });
      };

    }]);
