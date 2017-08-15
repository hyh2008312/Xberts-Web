'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageAdminCtrl', ['$window','$rootScope', 'DealsService', 'ShareProductService',
    '$mdSidenav','$timeout','$state','DealsFactory','$scope','ProductDeals','category','Paginator','$stateParams',
    'SystemConstant',
    function ($window, $rootScope, DealsService, ShareProductService, $mdSidenav,
              $timeout,$state,DealsFactory,$scope,ProductDeals,category,Paginator, $stateParams,SystemConstant) {
    var dealsCtrl = this;

    DealsService.getCategoryList = DealsFactory.getCategory(category);
    dealsCtrl.categories = DealsService.getCategoryList;
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.discount = DealsService.getDiscount();

    dealsCtrl.categoryId = DealsService.categoryId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;
    dealsCtrl.tabs = $stateParams.tab;

    dealsCtrl.country = $rootScope.country == 'ALL'? 'US':$rootScope.country;
    dealsCtrl.changeCountry = function(country) {
      $rootScope.country = country;
      dealsCtrl.changeCategory($scope.selectedIndex, true);
    };
    dealsCtrl.admin = true;
    dealsCtrl.countries = SystemConstant.CURRENCY;

    $scope.selectedIndex = 0;
    DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
    $scope.$on('$locationChangeSuccess', function () {
      DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
    });

    dealsCtrl.changeCategory = function ($index, refresh) {
      $scope.selectedIndex = $index;

      var categoryId = dealsCtrl.categories[$scope.selectedIndex].id;

      DealsService.categoryId = categoryId;
      dealsCtrl.categoryId = DealsService.categoryId;
      DealsService.priceId = null;
      DealsService.discountId = null;
      dealsCtrl.priceId = DealsService.priceId;
      dealsCtrl.discountId = DealsService.discountId;

      if($scope.selectedIndex == 0) {
        DealsFactory.updateUrl($scope,dealsCtrl.categories);
        dealsCtrl.productsPaginator = null;
        if(refresh) {
          DealsService.getHomeList().then(function(data) {
            dealsCtrl.productsPaginator = DealsFactory.rebuildProduct(data,DealsService.getCategoryList);
            DealsService.homeDealsList = dealsCtrl.productsPaginator;
          });
          return;
        }
        if(DealsService.homeDealsList == null) {
          DealsService.getHomeList().then(function(data) {
            dealsCtrl.productsPaginator = DealsFactory.rebuildProduct(data,DealsService.getCategoryList);
            DealsService.homeDealsList = dealsCtrl.productsPaginator;
          });
        } else {
          dealsCtrl.productsPaginator = DealsService.homeDealsList;
        }
      } else {

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


        if(categoryId != 'lighting_deals') {
          par.params.category = categoryId || null;
          par.params.promotion = null;
        } else {
          par.params.category =  null;
          par.params.promotion = "True";
        }

        DealsFactory.updateUrl($scope,dealsCtrl.categories);
        dealsCtrl.productsPaginator = new Paginator(par);
        dealsCtrl.productsPaginator.load();
      }
    };

    dealsCtrl.changeCategory($scope.selectedIndex);

    dealsCtrl.post = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.post');
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
        dealsCtrl.productsPaginator.params.min_discount = item.value1;
      } else {
        DealsService.discountId = null;
        dealsCtrl.discountId = DealsService.discountId;
        dealsCtrl.productsPaginator.params.min_discount = null;
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

