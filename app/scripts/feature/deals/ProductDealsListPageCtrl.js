angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$window','$rootScope','productsPaginator','categories','sort', 'DealsService', 'ShareProductService',
    '$mdSidenav','$timeout',
    function ($window, $rootScope, productsPaginator, categories, sort, DealsService, ShareProductService, $mdSidenav,$timeout) {
    var dealsCtrl = this;

    dealsCtrl.categories = categories;
    dealsCtrl.sort = sort;
    dealsCtrl.price = DealsService.getPrice();
    dealsCtrl.discount = DealsService.getDiscount();
    dealsCtrl.productsPaginator = productsPaginator;
    dealsCtrl.categoryId = ShareProductService.categoryId;
    dealsCtrl.sortId = DealsService.sortId;
    dealsCtrl.priceId = DealsService.priceId;
    dealsCtrl.discountId = DealsService.discountId;

    dealsCtrl.switcher = [true, true, true, true];
    dealsCtrl.onSwitcherChange = function(value, index) {
      dealsCtrl.switcher[index] = !value;
    };

    dealsCtrl.tagOrder = [1, 1, 1];
    var numberMax = function(arr) {
      var number = 0;
      angular.forEach(arr, function(e, i) {
        if(number < e) {
          number = e;
        }
      });
      return number;
    };
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
      dealsCtrl.tagOrder[0]= numberMax(dealsCtrl.tagOrder) + 1;
      if(dealsCtrl.tagOrder[0] >= 20) {
        dealsCtrl.tagOrder[0] -= 20;
        dealsCtrl.tagOrder[1] -= 20;
        dealsCtrl.tagOrder[2] -= 20;
      }
      ShareProductService.categoryId = categoryId;
      dealsCtrl.categoryId = ShareProductService.categoryId;
      dealsCtrl.productsPaginator.params.category = categoryId || null;
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeSort = function (sortId) {
      DealsService.sortId = sortId;
      dealsCtrl.productsPaginator.params.sortId = sortId || null;
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changePrice = function(filterIndex) {
      dealsCtrl.tagOrder[1]=numberMax(dealsCtrl.tagOrder) + 1;
      if(dealsCtrl.tagOrder[1] >= 20) {
        dealsCtrl.tagOrder[0] -= 20;
        dealsCtrl.tagOrder[1] -= 20;
        dealsCtrl.tagOrder[2] -= 20;
      }
      var item = dealsCtrl.price[filterIndex];
      DealsService.priceId = item.id;
      dealsCtrl.priceId = DealsService.priceId;
      dealsCtrl.productsPaginator.params.min_price = item.value1;
      dealsCtrl.productsPaginator.params.max_price = item.value2;
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    dealsCtrl.changeDiscount = function(filterIndex) {
      dealsCtrl.tagOrder[2]=numberMax(dealsCtrl.tagOrder) + 1;
      if(dealsCtrl.tagOrder[2] >= 20) {
        dealsCtrl.tagOrder[0] -= 20;
        dealsCtrl.tagOrder[1] -= 20;
        dealsCtrl.tagOrder[2] -= 20;
      }
      var item = dealsCtrl.discount[filterIndex];
      DealsService.discountId = item.id;
      dealsCtrl.discountId = DealsService.discountId;
      dealsCtrl.productsPaginator.params.min_discount = item.value1;
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

    var title = 'Deals - Daily Deals Offered by Global Merchants';
    var description = 'Explore the best deals worldwide to save big';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

