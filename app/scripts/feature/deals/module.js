'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.productDeals', {
      url: '/discover?tab',
      params:{
        tab:'everything'
      },
      templateUrl: 'scripts/feature/deals/productDealsListPage.html',
      controller: 'ProductDealsListPageCtrl as dealsCtrl',
      reloadOnSearch: false,
      resolve: {
        productsPaginator: ['Paginator', 'DealsService','ProductDeals','$stateParams',
          function (Paginator, DealsService, ProductDeals,$stateParams) {

          var par = {
            name: 'deals_product_list',
            objClass: ProductDeals,
            params: {
              category: DealsService.categoryId,
              min_price: DealsService.priceId != null ? DealsService.getPrice()[DealsService.priceId].value1: null,
              max_price: DealsService.priceId != null ? DealsService.getPrice()[DealsService.priceId].value2: null,
              page_size: 12
            },
            fetchFunction: DealsService.getDealsList
          };
          switch ($stateParams.tab) {
            case 'lighting_deals':
              par.params.promotion = 'True';
              break;
            case 'best_selling':
              par.params.search = 'cool';
              break;
            case 'editor':
              par.params.search = 'editor';
              break;
          }
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
      url: '/discover/:dealsId',
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
    })
    .state('application.protected.post', {
      url: '/discover/post/edit',
      templateUrl: 'scripts/feature/profile/EditPost.html',
      controller: 'EditDealsPostCtrl',
      resolve: {
        category: ['ShareProductService', function (ShareProductService) {
          return ShareProductService.getCategoryList();
        }]
      }
    });
  }]);
