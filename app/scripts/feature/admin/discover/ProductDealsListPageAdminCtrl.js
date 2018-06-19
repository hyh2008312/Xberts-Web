'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageAdminCtrl', ['$window','$rootScope', 'DealsService',
    '$mdSidenav','$timeout','$state','DealsFactory','$scope','ProductDeals','Paginator',
    function ($window, $rootScope, DealsService, $mdSidenav,
              $timeout,$state,DealsFactory,$scope,ProductDeals,Paginator) {
    var dealsCtrl = this;

    dealsCtrl.admin = $rootScope.user.isStaff()? true: false;

    dealsCtrl.categories = DealsService.categoryAdmin;
    dealsCtrl.categoryId = null;

    dealsCtrl.changeCategory = function (index) {
      dealsCtrl.categoryId = index == 0? null: index;
      switch(index) {
        case 0:
          var par = {
            name: 'deals_product_list_pending',
            objClass: ProductDeals,
            params: {
              page_size: 12
            },
            fetchFunction: DealsService.getPending
          };
          dealsCtrl.productsPaginator = new Paginator(par);
          dealsCtrl.productsPaginator.load();
          break;
        case 1:
          var par = {
            name: 'deals_product_list_skipped',
            objClass: ProductDeals,
            params: {
              page_size: 12
            },
            fetchFunction: DealsService.getSkipList
          };
          dealsCtrl.productsPaginator = new Paginator(par);
          dealsCtrl.productsPaginator.load();
          break;
        default:
          var par = {
            name: 'deals_product_list_pending',
            objClass: ProductDeals,
            params: {
              page_size: 12
            },
            fetchFunction: DealsService.getPending
          };
          dealsCtrl.productsPaginator = new Paginator(par);
          dealsCtrl.productsPaginator.load();
          break;
      }

    };
    dealsCtrl.changeCategory();

    var title = 'Discover - Exclusive Deals Curated by Community';
    var description = 'Discover the latest products and deals for a better life';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

