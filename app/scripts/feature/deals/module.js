angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.productDeals', {
      url: '/deals',
      templateUrl: 'scripts/feature/deals/productDealsListPage.html',
      controller: 'ProductDealsListPageCtrl as dealsCtrl',
      resolve: {
        productsPaginator: ['Paginator', 'DealsService','DealsP',function (Paginator, DealsService, ShareProduct) {
          //var par = {
          //  name: 'share_product_list',
          //  objClass: ShareProduct,
          //  params: {
          //    category: ShareProductService.categoryId,
          //    page_size: 5
          //  },
          //  fetchFunction: ShareProductService.getList
          //};
          //return new Paginator(par).load();
        }],
        categories: ['ShareProductService',function(ShareProductService) {
          return ShareProductService.getCategoryList();
        }],
        filter: ['ShareProductService',function(ShareProductService) {
          return ShareProductService.getCategoryList();
        }]
      }
    })
  }]);
