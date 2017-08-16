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
          if(i == 1) {
            if(k.indexOf('promotions') > -1) {
              var v = obj[k];
              item.product = ProductDeals.buildList(v);
              newArr.push(item);
            }
          }
        }
      }

      return newArr;
    };

    this.getCategory = function(_category) {
      var category = [{
        id: null,
        src: null,
        name: 'ALL',
        value: 'everything'
      },{
        id: 'lighting_deals',
        src: 'https://xberts.imgix.net/static/logo/4793fb7e-cf9b-4cfd-a5bd-45c154725bac.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=08e95a7977018dd246487b8a14c5590b',
        name: 'Lightning Deals',
        value: 'lightning_deals'
      },{
        id: '1',
        src: 'https://xberts.imgix.net/static/icon/d36548c1-e15f-475e-a766-f4dd26afae7a.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=34643a4a1e8b05258aacc4237ec39b63',
        name: 'Entertain-ment',
        value: 'entertainment'
      }, {
        id: '3',
        src: 'https://xberts.imgix.net/static/logo/ba707dd8-0a6d-4968-8e18-6625a24af39e.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=7fc1e8e7d96e1f311bd61a21ed6ce6d5',
        name: 'Home',
        value: 'home'
      }, {
        id: '10',
        src: 'https://xberts.imgix.net/static/logo/c98f8664-b369-456a-9669-24772b7a2cd9.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=d939420eac54e5c65585df1e6dfd6efd',
        name: 'Everyday Carry',
        value: 'everyday_carry'
      }, {
        id: '8',
        src: 'https://xberts.imgix.net/static/logo/657be4b5-230d-4bd2-a4aa-4b76bc22de61.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=dff1d465076a8c84981d75f6af9a33c6',
        name: 'Commute',
        value: 'commute'
      }, {
        id: '2',
        src: 'https://xberts.imgix.net/static/logo/b093e037-34d6-47db-a281-e4adad2ba6a3.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=498d9edab2e79f74b868c1581ab48509',
        name: 'Health',
        value: 'health'
      }, {
        id: '6',
        src: 'https://xberts.imgix.net/static/logo/d6f3425c-2c1c-437a-8ff5-c5e4ce78c23c.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=8b12ca946ed0b58a8c1e5270b1983148',
        name: 'Kitchen',
        value: 'kitchen'
      }, {
        id: '11',
        src: 'https://xberts.imgix.net/static/logo/95f416b3-3627-4ecb-9250-56c5d23f603c.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=37cf18ce3e37da7b1bac2b2a23676453',
        name: 'Exercise',
        value: 'exercise'
      }, {
        id: '5',
        src: 'https://xberts.imgix.net/static/logo/7e807936-55f5-46e1-8c3f-f59c3d267fb0.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=e293586305571a2611bc78ff729d125b',
        name: 'Outdoor',
        value: 'outdoor'
      }, {
        id: '12',
        src: 'https://xberts.imgix.net/static/logo/39253a68-8438-45bb-aadd-c8045a171fb3.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=6f2214fc7bd3a227b2cac289541dc432',
        name: 'Kids',
        value: 'kids'
      }, {
        id: '9',
        src: 'https://xberts.imgix.net/static/logo/007bd5fb-9b95-46e3-9fbf-a2e1519d6de9.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=5cbd94dc890d0a59517c018db15e0bde',
        name: 'Pets',
        value: 'pets'
      }, {
        id: '4',
        src: 'https://xberts.imgix.net/static/logo/609ab993-8630-4fa4-9835-6e36bf0c171e.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=828213fd6b5ff9d9a47aaaa1db81f9dc',
        name: 'Travel',
        value: 'travel'
      }, {
        id: '7',
        src: 'https://xberts.imgix.net/static/logo/738ab964-ded0-46ca-9b92-a346f3c82499.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=9bddd52e50e32593353c7b85978e8f55',
        name: 'Office',
        value: 'office'
      }, {
        id: '13',
        src: 'https://xberts.imgix.net/static/logo/0d5d3aa6-001d-4a6f-8a23-11f5553d657b.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=28a4ce3f1dfd45873d8d4bc5de44f2dc',
        name: 'Mobiles',
        value: 'mobiles'
      }, {
        id: '14',
        src: null,
        name: 'Other',
        value: 'other'
      }];

      if(_category == null) {
        return category;
      }
      var newArr = [];
      for(var i = 0; i < _category.length;i++) {
        var id = _category[i].id;
        var item = category.find(function(item) {
          return item.id == id;
        });

        newArr.push(item);
      }

      newArr.unshift(category[1]);
      newArr.unshift(category[0]);

      return newArr;
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
