angular.module('xbertsApp')
  .service('ShareProductService', ['$resource','ShareProduct','API_BASE_URL',function ($resource,ShareProduct,API_BASE_URL) {
    var ShareProductResource = $resource(API_BASE_URL + '/products/:id/', {id:'@id'},{'put': {method: 'PUT'}});
    var CategoryResource = $resource(API_BASE_URL + '/products/categories/', null);
    var ShareProductDetail = $resource(API_BASE_URL + '/products/:id/', {id: '@id'});

    this.categoryId = null;

    this.getList = function (params) {
      return ShareProductResource.get(params).$promise.then(ShareProduct.buildPageList);
    };

    this.create = function (data) {
      return ShareProductResource.save(data).$promise.then(ShareProduct.build);
    };

    this.update = function (data) {
      return ShareProductResource.put(data).$promise.then(ShareProduct.build);
    };

    this.getCategoryList = function (params) {
      return CategoryResource.query(params).$promise;
    };

    this.getDetail = function (reviewId) {
      return ShareProductDetail.get({id: reviewId}).$promise.then(ShareProduct.build);
    };

    this.getRecommendList = function (params) {
      return $resource(API_BASE_URL + '/products/' + params + '/related/').query(params).$promise.then(ShareProduct.buildList);
    };
  }]);
