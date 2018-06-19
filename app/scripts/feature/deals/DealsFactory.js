'use strict';

angular.module('xbertsApp')
  .factory('DealsFactory', ['$rootScope','$location','$timeout','$mdSidenav','DealsService','ProductDeals',
    function ($rootScope,$location,$timeout,$mdSidenav,DealsService,ProductDeals) {

    var self = this;

    this.updateUrl = function ($scope,array) {
      setTimeout(function () {
        $scope.$apply(function () {
          $location.search('tab', $scope.selectedIndex>=0?array[$scope.selectedIndex.toString()].value:null);
        });
      }, 0);
    };

    this.updateActiveTabOnSearch = function(scope, array) {
      var tab = $location.search().tab;
      $rootScope.dealsTab = tab;
      scope.selectedIndex = parseInt(array.findIndex(function(x) {
        return x.value == tab;
      }));
      if($rootScope.state.current.name == 'application.productDeals') {
        if(scope.selectedIndex < 0) {
          scope.selectedIndex = 0;
        }
      }
    };

    this.debounce = function(func, wait, context) {
      var timer;

      return function debounced() {
        var args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    };

    this.buildDelayedToggler = function(navID, context) {
      return self.debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID).toggle();
      }, 200, context);
    };

    this.rebuildProduct = function(obj,category) {

      var newArr = [];

      for(var i = 0; i < category.length;i++) {
        var item = category[i];
        var _id = category[i].id;
        for(var k in obj) {
          if(k.indexOf('category') > -1) {
            var id = k.split('_')[1];
            var v = obj[k];
            if(_id == id) {
              item.product = ProductDeals.buildList(v);
              newArr.push(item);
            }
          }
        }
      }

      return newArr;
    };

    this.category = DealsService.categoryLocal;

    this.categoryItem = null;

    var _self = this;

    this.getCategory = function(_category) {

      if(_category == null) {
        return _self.category;
      }
      var newArr = [];
      for(var i = 0; i < _category.length;i++) {
        var id = _category[i].id;
        var item = _self.category.find(function(item) {
          return item.id == id;
        });

        newArr.push(item);
      }

      newArr.unshift(_self.category[0]);

      return newArr;
    };

    this.changeFolloweeList = function(productsDetail) {

      var followeeList = $rootScope.user.getFollowees();

      if(productsDetail.owner != null) {
        productsDetail.owner.currentUser = {
          follow: false
        };

        angular.forEach(followeeList, function(f) {
          if(f == productsDetail.owner.id) {
            productsDetail.owner.currentUser.follow = true;
          }
        });
      }

      return productsDetail;
    };

    this.signupPicture = null;

    this.signupPictureList = [
      'https://xberts.imgix.net/shareProduct/020faceb-9337-48af-9fb6-0f7a3a5be43c.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=1987befb4823a49f0e6d40ce9552da99',
      'https://xberts.imgix.net/shareProduct/364ff990-4c7c-40ab-ab07-9c226742c3ca.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=f16f5186b5e35abf55e3b94e7b52e40b',
      'https://xberts.imgix.net/shareProduct/befe56ea-8d53-44c5-a643-55f7f5076b50.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=5899fbb30d87956da3e930d25a30b521',
      'https://xberts.imgix.net/shareProduct/9cc66322-e0a4-4157-bd95-cac2f1f92248.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=cb14ba20416b296e3921a620b77dfef2'
    ];

    return this;
  }]);
