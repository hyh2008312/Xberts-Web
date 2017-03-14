angular.module('xbertsApp')
  .service('ShareProductService', ['$resource','ShareProduct','API_BASE_URL',function ($resource,ShareProduct,API_BASE_URL) {
    var ShareProductResource = $resource(API_BASE_URL + '/products/:id/', null);

    this.getList = function (params) {
      return ShareProductResource.get(params).$promise.then(ShareProduct.buildPageList);
    };

    this.create = function (feedback) {

    };

    var categoryResource = $resource(API_BASE_URL + '/products/categories/', null);

    this.getCategoryList = function (params) {
      return categoryResource.query(params).$promise;
    };
  }]);
