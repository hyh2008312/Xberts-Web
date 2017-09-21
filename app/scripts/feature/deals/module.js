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
      resolve: {
        category: ['DealsService', function (DealsService) {
          return DealsService.getCategoryOrder();
        }]
      }
    })
    .state('application.adminDeals', {
      url: '/admin/discover?tab',
      params:{
        tab:'everything'
      },
      templateUrl: 'scripts/feature/deals/productDealsListPage.html',
      controller: 'ProductDealsListPageAdminCtrl as dealsCtrl',
      reloadOnSearch: false,
      resolve: {
        category: ['DealsService', function (DealsService) {
          return DealsService.getCategoryOrder();
        }]
      }
    })
    .state('application.productDeals.dealsDetail', {
      url: '^/discover/:dealsId',
      params: {
        isPopupOpen : null
      },
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
        category: ['DealsService', function (DealsService) {
          return DealsService.getCategoryOrder();
        }]
      }
    });
  }]);
