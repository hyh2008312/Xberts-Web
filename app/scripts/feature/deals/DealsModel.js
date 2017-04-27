angular.module('xbertsApp')
  .factory('ProductDeals',ProductDeals);
function ProductDeals() {

  function ProductDeals(data) {
    angular.extend(this, data);
  }

  ProductDeals.prototype = {
  };

  ProductDeals.build = function (data) {
    return new ProductDeals(data)
  };

  ProductDeals.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return ProductDeals.build(item);
    });

    return data;
  };

  ProductDeals.buildList = function (data) {
    return data.map(function (item) {
      return ProductDeals.build(item);
    })
  };

  return ProductDeals;
}
