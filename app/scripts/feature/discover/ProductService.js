angular.module('xbertsApp')
  .service('ShareProductService', ['$q', '$timeout', function ($q, $timeout) {
    var products = [
      {
        title: 'share product 1',
        details: 'shahe  dkshak jshdh'
      }
    ];

    this.getList = function () {
      var delay = $q.defer();

      if (products.length < 1) {
        delay.reject('no product');
      } else {
        $timeout(function () {
          delay.resolve(products);
        }, 15)
      }
      return delay.promise;
    };
  }]);
