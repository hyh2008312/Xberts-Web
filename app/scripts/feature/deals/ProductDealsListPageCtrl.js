'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$window','$rootScope','productsPaginator','categories','sort', 'DealsService', 'ShareProductService',
    '$mdSidenav','$timeout','$state','DealsFactory','$scope',
    function ($window, $rootScope, productsPaginator, categories, sort, DealsService, ShareProductService, $mdSidenav,
              $timeout,$state,DealsFactory,$scope) {
    var dealsCtrl = this;

    dealsCtrl.categories = [];
    angular.forEach(categories,function(e) {
      dealsCtrl.categories.push(e);
    });
    dealsCtrl.sort = sort;
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.discount = DealsService.getDiscount();
    dealsCtrl.productsPaginator = productsPaginator;
    dealsCtrl.categoryId = DealsService.categoryId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;
    dealsCtrl.sortId = DealsService.sortId;

    $scope.selectedIndex = 0;
    DealsFactory.updateActiveTabOnSearch($scope,sort);
    $scope.$on('$locationChangeSuccess', function () {
      DealsFactory.updateActiveTabOnSearch($scope,sort);
      if(sort[$scope.selectedIndex]) {
        dealsCtrl.changeSort(sort[$scope.selectedIndex].value);
      }
    });

    dealsCtrl.post = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.post');
    };

    dealsCtrl.tagOrder = [1, 1];

    dealsCtrl.removeTag = function(name) {
      dealsCtrl[name] = null;
      switch (name) {
        case 'categoryId':
          ShareProductService.categoryId = null;
          dealsCtrl.productsPaginator.params.category = null;
          break;
        case 'priceId':
          DealsService.priceId = null;
          dealsCtrl.productsPaginator.params.min_price = null;
          dealsCtrl.productsPaginator.params.max_price = null;
          break;
        case 'discountId':
          DealsService.discountId = null;
          dealsCtrl.productsPaginator.params.min_discount = null;
          break;
      }
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeCategory = function (categoryId) {
      DealsService.categoryId = categoryId;
      dealsCtrl.categoryId = DealsService.categoryId;
      dealsCtrl.productsPaginator.params.category = categoryId || null;
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeSort = function (sortId) {
      dealsCtrl.sortId = sortId == 'everything'? null: sortId;
      dealsCtrl.productsPaginator.params.promotion = null;
      dealsCtrl.productsPaginator.params.search = null;
      switch (sortId) {
        case 'lighting_deals':
          $scope.selectedIndex = 1;
          dealsCtrl.productsPaginator.params.promotion = 'True';
              break;
        case 'best_sellers':
          $scope.selectedIndex = 2;
          dealsCtrl.productsPaginator.params.search = 'cool';
              break;
        default :
          $scope.selectedIndex = 0;
              break;
      }
      DealsFactory.updateUrl($scope,sort);
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changePrice = function(filterIndex) {
      if(filterIndex != null) {
        var item = dealsCtrl.price[filterIndex];
        DealsService.priceId = item.id;
        dealsCtrl.priceId = DealsService.priceId;
        dealsCtrl.productsPaginator.params.min_price = item.value1;
        dealsCtrl.productsPaginator.params.max_price = item.value2;
      } else {
        DealsService.priceId = null;
        dealsCtrl.priceId = DealsService.priceId;
        dealsCtrl.productsPaginator.params.min_price = null;
        dealsCtrl.productsPaginator.params.max_price = null;
      }
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeDiscount = function(discountIndex) {
      if(discountIndex != null) {
        var item = dealsCtrl.discount[discountIndex];
        DealsService.discountId = item.id;
        dealsCtrl.discountId = DealsService.discountId;
        dealsCtrl.productsPaginator.params.dicount = item.value1;
      } else {
        DealsService.discountId = null;
        dealsCtrl.discountId = DealsService.discountId;
        dealsCtrl.productsPaginator.params.dicount = null;
      }
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    var title = 'Discover - Exclusive Deals Curated by Community';
    var description = 'Discover the latest products and deals for a better life';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

