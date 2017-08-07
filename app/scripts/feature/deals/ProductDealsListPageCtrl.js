'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$window','$rootScope','productsPaginator', 'DealsService', 'ShareProductService',
    '$mdSidenav','$timeout','$state','DealsFactory','$scope',
    function ($window, $rootScope, productsPaginator, DealsService, ShareProductService, $mdSidenav,
              $timeout,$state,DealsFactory,$scope) {
    var dealsCtrl = this;

    dealsCtrl.categories = DealsService.getCategory();
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.discount = DealsService.getDiscount();
    dealsCtrl.productsPaginator = productsPaginator;
    dealsCtrl.categoryId = DealsService.categoryId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;

    $scope.selectedIndex = 0;
    DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
    $scope.$on('$locationChangeSuccess', function () {
      DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
      if( dealsCtrl.categories[$scope.selectedIndex]) {
        dealsCtrl.changeCategory( $scope.selectedIndex);
      }
    });

    dealsCtrl.post = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.post');
    };

    dealsCtrl.changeCategory = function ($index) {
      $scope.selectedIndex = $index;

      var categoryId = dealsCtrl.categories[$scope.selectedIndex].id;

      DealsService.categoryId = categoryId;
      dealsCtrl.categoryId = DealsService.categoryId;
      DealsService.priceId = null;
      DealsService.discountId = null;
      dealsCtrl.priceId = DealsService.priceId;
      dealsCtrl.discountId = DealsService.discountId;

      if(categoryId != 'lighting_deals') {
        dealsCtrl.productsPaginator.params.category = categoryId || null;
        dealsCtrl.productsPaginator.params.promotion = null;
      } else {
        dealsCtrl.productsPaginator.params.category =  null;
        dealsCtrl.productsPaginator.params.promotion = true;
      }

      DealsFactory.updateUrl($scope,dealsCtrl.categories);
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

