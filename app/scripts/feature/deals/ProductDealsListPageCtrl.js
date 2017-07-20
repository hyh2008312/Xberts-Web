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
    dealsCtrl.productsPaginator = productsPaginator;
    dealsCtrl.categoryId = ShareProductService.categoryId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;

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
      dealsCtrl.tagOrder[0]= DealsService.getMaxNumber(dealsCtrl.tagOrder) + 1;
      if(dealsCtrl.tagOrder[0] >= 20) {
        dealsCtrl.tagOrder[0] -= 20;
        dealsCtrl.tagOrder[1] -= 20;
      }
      ShareProductService.categoryId = categoryId;
      dealsCtrl.categoryId = ShareProductService.categoryId;
      dealsCtrl.productsPaginator.params.category = categoryId || null;
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeSort = function (sortId) {
      dealsCtrl.sortId = sortId;
      dealsCtrl.productsPaginator.params.promotion = null;
      dealsCtrl.productsPaginator.params.search = null;
      switch (sortId) {
        case 'promotion':
          $scope.selectedIndex = 1;
          dealsCtrl.productsPaginator.params.promotion = 'True';
              break;
        case 'cool':
          $scope.selectedIndex = 2;
          dealsCtrl.productsPaginator.params.search = 'cool';
              break;
        default:
          $scope.selectedIndex = 0;
              break;
      }
      DealsFactory.updateUrl($scope,sort);
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changePrice = function(filterIndex) {
      if(filterIndex != null) {
        dealsCtrl.tagOrder[1] = DealsService.getMaxNumber(dealsCtrl.tagOrder) + 1;
        if(dealsCtrl.tagOrder[1] >= 20) {
          dealsCtrl.tagOrder[0] -= 20;
          dealsCtrl.tagOrder[1] -= 20;
        }
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

    // mobile sidenav toggle from left
    dealsCtrl.toggleLeft = DealsFactory.buildDelayedToggler('filterLeft', dealsCtrl);

    dealsCtrl.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('filterLeft').close();
    };

    var title = 'Discover - Exclusive Deals by Xberts Community';
    var description = 'Discover the latest products and deals for a better life';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

