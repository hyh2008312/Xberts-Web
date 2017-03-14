angular.module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('application.shareProductList', {
        url: '/shareProduct?category',
        templateUrl: 'scripts/feature/discover/shareProductListPage.html',
        controller: 'ShareProductListPageCtrl as productCtrl',
        resolve: {
          productsPaginator: ['Paginator', '$stateParams', 'ShareProductService','ShareProduct',function (Paginator, $stateParams, ShareProductService, ShareProduct) {
            var par = {
              name: 'share_product_list',
              objClass: ShareProduct,
              params: {
                category: $stateParams.category,
                page_size: 12
              },
              fetchFunction: ShareProductService.getList
            };
            return new Paginator(par).load();
          }],
          categories: ['ShareProductService',function (ShareProductService) {
            return ShareProductService.getCategoryList();
          }]
        }
      });
  }]);
