angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.productDeals', {
      url: '/deals',
      templateUrl: 'scripts/feature/deals/productDealsListPage.html',
      controller: 'ProductDealsListPageCtrl as dealsCtrl',
      resolve: {
        productsPaginator: ['Paginator', 'DealsService','ProductDeals',function (Paginator, DealsService, ProductDeals) {
          var par = {
            name: 'deals_product_list',
            objClass: ProductDeals,
            params: {
              category: DealsService.categoryId,
              page_size: 12
            },
            fetchFunction: DealsService.getDealsList
          };
          return new Paginator(par).load();
        }],
        categories: ['ShareProductService',function(ShareProductService) {
          return ShareProductService.getCategoryList();
        }],
        sort: ['DealsService',function(DealsService) {
          return DealsService.getSort();
        }]
      }
    })
  }]);