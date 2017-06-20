'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$window','$rootScope','productsPaginator','categories','sort', 'DealsService', 'ShareProductService',
    '$mdSidenav','$timeout','$state',
    function ($window, $rootScope, productsPaginator, categories, sort, DealsService, ShareProductService, $mdSidenav,
              $timeout,$state) {
    var dealsCtrl = this;

    dealsCtrl.categories = [];
    angular.forEach(categories,function(e) {
      dealsCtrl.categories.push(e);
    });
    dealsCtrl.sort = sort;
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.productsPaginator = productsPaginator;
    dealsCtrl.categoryId = ShareProductService.categoryId;
    dealsCtrl.sortId = DealsService.sortId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;

    dealsCtrl.switcher = [true, true, true, true];
    dealsCtrl.onSwitcherChange = function(value, index) {
      dealsCtrl.switcher[index] = !value;
    };

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
      dealsCtrl.productsPaginator.params.min_discount = null;
      dealsCtrl.productsPaginator.params.search = null;
      switch (sortId) {
        case 'discount':
          dealsCtrl.productsPaginator.params.min_discount = 0.5;
              break;
        case 'search':
          dealsCtrl.productsPaginator.params.search = 'cool';
              break;
        case 'editor':
          dealsCtrl.productsPaginator.params.search = 'editor';
          break;
      }
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

    dealsCtrl.toggleLeft = buildDelayedToggler('filterLeft');

    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = dealsCtrl,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID).toggle();
      }, 200);
    }

    dealsCtrl.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('filterLeft').close();

    };

    var title = 'Discover - Exclusive Offers by Xberts Community';
    var description = 'Discover the latest products and deals for a better life';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

