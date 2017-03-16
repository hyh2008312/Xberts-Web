angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.shareProductList', {
      url: '/discover',
      templateUrl: 'scripts/feature/discover/shareProductListPage.html',
      controller: 'ShareProductListPageCtrl as productCtrl',
      resolve: {
        productsPaginator: ['Paginator', 'ShareProductService','ShareProduct',function (Paginator, ShareProductService, ShareProduct) {
          var par = {
            name: 'share_product_list',
            objClass: ShareProduct,
            params: {
              category: ShareProductService.categoryId,
              page_size: 12
            },
            fetchFunction: ShareProductService.getList
          };
          return new Paginator(par).load();
        }],
        categories: ['ShareProductService',function(ShareProductService) {
          return ShareProductService.getCategoryList();
        }]
      }
    })
    .state('application.shareProductDetail', {
      url: '/discover/:reviewId',
      templateUrl: 'scripts/feature/discover/shareProductDetail.html',
      controller: 'ShareProductDetailCtrl as productDetailCtrl',
      resolve: {
        productsDetail: ['ShareProductService','$stateParams',function(ShareProductService, $stateParams) {
          return ShareProductService.getDetail($stateParams.reviewId);
        }],
        recommendList: ['ShareProductService','$stateParams',function(ShareProductService, $stateParams) {
            return ShareProductService.getRecommendList($stateParams.reviewId);
          }]
      }
    });
  }]);
