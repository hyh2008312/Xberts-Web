'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$window','$rootScope', 'DealsService', 'ShareProductService',
    '$mdSidenav','$state','DealsFactory','$scope','ProductDeals','category','Paginator','$stateParams',
    function ($window, $rootScope, DealsService, ShareProductService, $mdSidenav,
              $state,DealsFactory,$scope,ProductDeals,category,Paginator, $stateParams) {
    var dealsCtrl = this;

    DealsService.getCategoryList = DealsFactory.getCategory(category);
    dealsCtrl.categories = DealsService.getCategoryList;
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.discount = DealsService.getDiscount();

    dealsCtrl.categoryId = DealsService.categoryId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;
    dealsCtrl.tabs = $stateParams.tab;

    $scope.selectedIndex = 0;
    $scope.changeScroll = function(scroll) {
      $scope.isScroll = scroll;
      $rootScope.isScroll = !$scope.isScroll;
    };
    $scope.changeScroll(true);
    DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);

    $rootScope.$on('$stateChangeSuccess', function() {
      DealsFactory.updateActiveTabOnSearch($scope, dealsCtrl.categories);
    });

    dealsCtrl.productsPaginator = DealsService.getCategory();

    dealsCtrl.categoryItem = DealsFactory.categoryItem;

    dealsCtrl.changeCategory = function ($index) {
      $scope.selectedIndex = $index;
      $rootScope.dealsFactory  = {};

      if($scope.selectedIndex == -1) {
        $scope.selectedIndex = 0;
        $scope.changeScroll(true);

        var categoryId = dealsCtrl.categories[$scope.selectedIndex].id;
        DealsFactory.categoryItem = dealsCtrl.categories[$scope.selectedIndex].value;
        $rootScope.dealsFactory.categoryItem = DealsFactory.categoryItem;

        DealsService.categoryId = categoryId;
        dealsCtrl.categoryId = DealsService.categoryId;
        DealsService.priceId = null;
        DealsService.discountId = null;
        dealsCtrl.priceId = DealsService.priceId;
        dealsCtrl.discountId = DealsService.discountId;

        dealsCtrl.productsPaginator = DealsService.getCategory();
        dealsCtrl.mainLoaded = false;

        if(DealsService.homeDealsList == null) {
          DealsService.getHomeList().then(function(data) {
            dealsCtrl.mainLoaded = true;
            dealsCtrl.productsPaginator = DealsFactory.rebuildProduct(data,DealsService.getCategoryList);
            DealsService.homeDealsList = dealsCtrl.productsPaginator;
          });
        } else {
          dealsCtrl.mainLoaded = true;
          dealsCtrl.productsPaginator = DealsService.homeDealsList;
        }
        return;
      }

      var categoryId = dealsCtrl.categories[$scope.selectedIndex].id;
      DealsFactory.categoryItem = dealsCtrl.categories[$scope.selectedIndex].value;
      $rootScope.dealsFactory.categoryItem = DealsFactory.categoryItem;

      DealsService.categoryId = categoryId;
      dealsCtrl.categoryId = DealsService.categoryId;
      DealsService.priceId = null;
      DealsService.discountId = null;
      dealsCtrl.priceId = DealsService.priceId;
      dealsCtrl.discountId = DealsService.discountId;

      if($scope.selectedIndex == 0) {
        $scope.changeScroll(true);

        DealsFactory.updateUrl($scope,dealsCtrl.categories);
        dealsCtrl.productsPaginator = DealsService.getCategory();
        dealsCtrl.mainLoaded = false;

        if(DealsService.homeDealsList == null) {
          DealsService.getHomeList().then(function(data) {
            dealsCtrl.mainLoaded = true;
            dealsCtrl.productsPaginator = DealsFactory.rebuildProduct(data,DealsService.getCategoryList);
            DealsService.homeDealsList = dealsCtrl.productsPaginator;
          });
        } else {
          dealsCtrl.mainLoaded = true;
          dealsCtrl.productsPaginator = DealsService.homeDealsList;
        }

      } else {
        $scope.changeScroll(false);

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
        dealsCtrl.productsPaginator.load().then(dealsCtrl.loadFinished);

      }
    };

    dealsCtrl.loadNext = function() {
      dealsCtrl.productsPaginator.loadNext().then(dealsCtrl.loadFinished);
    };

    dealsCtrl.loadFinished = function(data) {
      if(!data.next && !data.loading) {
        var scrollTop =  document.getElementsByClassName('xb-deals-bg')[0].scrollTop;

        $scope.changeScroll(true);

        $scope.$watch('$viewContentLoaded', function() {
          angular.element('.xb-body-view').animate({
            scrollTop: scrollTop
          },10);
        });

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

    $scope.isPopupOpen = false;
    $scope.display = false;
    $rootScope.showToobar = $scope.isPopupOpen;

    $rootScope.$on('$stateChangeStart', function () {
      if($rootScope.state.current.name == 'application.productDeals.dealsDetail') {
        $scope.isPopupOpen = false;
        $scope.display = false;
        $rootScope.showToobar = $scope.isPopupOpen;
      }
    });

    dealsCtrl.openPop = function(dealsId) {
      $scope.display = true;
      $rootScope.showToobar = true;
      $state.go('application.productDeals.dealsDetail',{dealsId:dealsId, isPopupOpen: true});
    };

    $scope.jumpToDeals = function (isPopupOpen,display) {
      if(!isPopupOpen && display) {

        $state.go('application.productDeals',{tab:DealsFactory.categoryItem});
        $scope.isPopupOpen = false;
        $scope.display = false;
        $rootScope.showToobar = $scope.isPopupOpen;

      }
    };

    var title = 'Discover - Exclusive Deals Curated by Community';
    var description = 'Discover the latest products and deals for a better life';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

