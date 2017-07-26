'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.search', {
      url: '/search',
      templateUrl: 'scripts/feature/search/searchResult.html',
      controller: 'SearchResultCtrl',
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
                page_size: 12
              },
              fetchFunction: DealsService.getDealsList
            };
            return new Paginator(par).load();
        }],
        askPaginator: ['Paginator', 'AskService', 'AskModel',
          function (Paginator, AskService, AskModel) {
            var par = {
              name: 'ask_questions_list',
              objClass: AskModel,
              params: {
                page_size: 12
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
        }],
        reviews: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
          var par = {
            name: 'all_review_list',
            objClass:MainModel,
            params: {
              page_size: 12
            },
            fetchFunction: MainService.getReviewsList
          };
          return new Paginator(par).load();
        }],
        result: [function(SearchService) {
          return {};
        }]
      }
    })
  }]);
