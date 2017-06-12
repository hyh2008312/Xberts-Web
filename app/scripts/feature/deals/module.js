'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.productDeals', {
      url: '/deals',
      templateUrl: 'scripts/feature/deals/productDealsListPage.html',
      controller: 'ProductDealsListPageCtrl as dealsCtrl',
      resolve: {
        productsPaginator: ['Paginator', 'DealsService','ProductDeals',
          function (Paginator, DealsService, ProductDeals) {
          var par = {
            name: 'deals_product_list',
            objClass: ProductDeals,
            params: {
              category: DealsService.categoryId,
              min_price: DealsService.priceId != null ? DealsService.getPrice()[DealsService.priceId].value1: null,
              max_price: DealsService.priceId != null ? DealsService.getPrice()[DealsService.priceId].value2: null,
              min_discount: DealsService.discountId != null ?DealsService.getDiscount()[DealsService.discountId].value1: null,
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
    .state('application.dealsDetail', {
      url: '/deals/:dealsId',
      templateUrl: 'scripts/feature/deals/productDealsDetail.html',
      controller: 'ProductDealsDetailCtrl',
      resolve: {
        productsDetail: ['DealsService','$stateParams',function(DealsService, $stateParams) {
          return DealsService.getDetail($stateParams.dealsId);
        }],
        productsPaginator: ['DealsService','$stateParams',function (DealsService,$stateParams) {
          return DealsService.getRecommendList($stateParams.dealsId);
        }]
      }
    });
  }]);
