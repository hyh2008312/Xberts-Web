'use strict';

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
    .state('application.dealsDetail', {
      url: '/deals/:dealsId',
      templateUrl: 'scripts/feature/deals/productDealsDetail.html',
      controller: 'ProductDealsDetailCtrl',
      resolve: {
        productsDetail: ['DealsService','$stateParams',function(DealsService, $stateParams) {
          //return DealsService.getDetail($stateParams.dealsId);
          return {
            "id": 227,
            "title": "Hitachi Ultrastar A7K2000 HUA722020ALA331 2TB  32MB cache Internal Hard Drive",
            "coverUrl": "http://i.ebayimg.com/images/g/2GMAAOSwU8hY5oj2/s-l300.jpg",
            "buyUrl": "http://www.ebay.com/itm/Hitachi-Ultrastar-A7K2000-HUA722020ALA331-2TB-32MB-cache-Internal-Hard-Drive-/252847600522?_trkparms=5079%3A5000006400",
            "originalPrice": 69.99,
            "discountPrice": 29.99,
            "discount": 0.571510215745106,
            "promotionDeadline": null,
            "tags": "tech"
          };
        }],
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
        }]
      }
    });
  }]);
