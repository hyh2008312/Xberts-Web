'use strict';

angular.module('xbertsApp')
  .service('DealsService', ['$rootScope','$resource','ProductDeals','API_BASE_URL',
    function ($rootScope,$resource,ProductDeals,API_BASE_URL) {

    var DealsProductHomeResource = $resource(API_BASE_URL + '/products/home/',{},{
      'get' : {
        method:'GET',
        params:{
          no_auth: true
        }
      }
    });
    var DealsProductResource = $resource(API_BASE_URL + '/products/:id/',{id:'@id'},{'patch': {method: 'PATCH'},
      'delete':{method:'DELETE'}});
    var DealsProductRelatedResource = $resource(API_BASE_URL + '/products/:id/related/',{id:'@id'}, {
      'query' : {
        method:'GET',
        params:{
          no_auth: true
        },
        isArray:true
      }
    });
    var CategoryResource = $resource(API_BASE_URL + '/products/categories/', null);
    var PendingResource = $resource(API_BASE_URL + '/products/pending/');
    var SkipResource = $resource(API_BASE_URL + '/products/skipped/');

    this.categoryId = null;
    this.priceId = null;
    this.discountId = null;
    this.sortId = null;

    this.homeDealsList = null;

    this.getHomeList = function(params) {
      params = {};
      params.approval_status = 'approved';
      params.country = $rootScope.country;
      params.promotion_status = 2;
      return DealsProductHomeResource.get(params).$promise;
    };

    this.getDealsList = function(params) {
      params.approval_status = 'approved';
      params.country = $rootScope.country;
      params.promotion_status = 2;
      return $resource(API_BASE_URL + '/products/:id/',{id:'@id'},{
        'get' : {
          method:'GET',
          params:{
            no_auth: true
          }
        }
      }).get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.getDealsAdminList = function(params) {
      return $resource(API_BASE_URL + '/products/:id/',{id:'@id'},{
        'get' : {
          method:'GET',
          params:{
            no_auth: true
          }
        }
      }).get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.getDetail = function(dealsId) {
      return DealsProductResource.get({id:dealsId}).$promise.then(ProductDeals.build);
    };

    this.getRecommendList = function(id) {
      return DealsProductRelatedResource.query({id:id}).$promise.then(ProductDeals.buildList);
    };

    this.create = function (data) {
      return DealsProductResource.save(data).$promise.then(ProductDeals.build);
    };

    this.update = function(data) {
      return DealsProductResource.patch(data).$promise.then(ProductDeals.build);
    };

    this.delete = function (data) {
      return DealsProductResource.delete(data).$promise.then(ProductDeals.build);
    };

    this.getPending = function (params) {
      return PendingResource.get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.getSkipList = function(params) {
      return SkipResource.get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.setSkip = function(params) {
      return $resource(API_BASE_URL + '/products/:id/mark_skipped/',{id:'@id'}).save(params).$promise;
    };

    this.getMaxNumber = function(arr) {
      var number = 0;
      angular.forEach(arr, function(e, i) {
        if(number < e) {
          number = e;
        }
      });
      return number;
    };

    this.getCategoryList = null;

    this.categoryLocal = [{
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
      name: 'Audio',
      value: 'audio'
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
      name: 'Car Bike',
      value: 'car_bike'
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
      name: 'Sports Fitness',
      value: 'sports_fitness'
    }, {
      id: '5',
      src: 'https://xberts.imgix.net/static/logo/7e807936-55f5-46e1-8c3f-f59c3d267fb0.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=e293586305571a2611bc78ff729d125b',
      name: 'Outdoor Travel',
      value: 'outdoor_travel'
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
      name: 'Laptop PC',
      value: 'laptop_PC'
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
    }, {
      id: '15',
      src: 'https://xberts.imgix.net/static/icon/b6b64b9b-6fa5-45e2-a936-296eba1740e2.jpg?auto=format%2Cenhance%2Ccompress&crop=edges&fit=crop&ixlib=python-1.1.2&s=de19ce0ad97020b163601894b37cb8bf',
      name: 'Men<br>Fashion',
      value: 'men_fashion'
    }, {
      id: '16',
      src: 'https://xberts.imgix.net/static/icon/3d5c57e4-34c5-4206-90d1-ca8e694ffb25.jpg?auto=format%2Cenhance%2Ccompress&crop=edges&fit=crop&ixlib=python-1.1.2&s=70c326b60a6956fe52379f4b89bc93f5',
      name: 'Women Fashion',
      value: 'women_fashion'
    }];

    this.categoryAdmin = [{
      id: null,
      src: null,
      name: 'PENDING',
      value: 'everything'
    }, {
      id: 1,
      src: null,
      name: 'SKIP',
      value: 'everything'
    }];

    var _self = this;

    this.getCategory = function(_category) {
      var category = _self.categoryLocal;

      if(_category == null) {
        return category;
      }
    };

    this.getSort = function() {
      return [{
        value: 'everything',
        name: 'All'
      },{
        value: 'lighting_deals',
        name: ' Lightning Deals'
      },{
        value: "best_sellers",
        name: 'Best Sellers'
      }]
    };

    this.getPrice = function() {
      return [{
        id: '0',
        name: 'Under $25',
        value1: '0',
        value2: '25'
      },{
        id: '1',
        name: '$25 to $50',
        value1: '25',
        value2: '50'
      },{
        id: '2',
        name: '$50 to $100',
        value1: '50',
        value2: '100'
      },{
        id: '3',
        name: '$100 to $200',
        value1: '100',
        value2: '200'
      },{
        id: '4',
        name: '$200 & Above',
        value1: '200',
        value2: ''
      }];
    };

    this.getDiscount = function() {
      return [{
        id: '0',
        name: '30% Off or More',
        value1: '0.3'
      },{
        id: '1',
        name: '50% Off or More',
        value1: '0.5'
      },{
        id: '2',
        name: '70% Off or More',
        value1: '0.7'
      }];
    };

    this.headImage = 'https://xberts.imgix.net/static/logo/2de5d639-3fd6-4d95-b711-8fbc837244a6.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=5f80b68fa3d73f229fde39024a386aee';

    this.categoryList = null;

    this.getCategoryOrder = function (params) {
      if(this.categoryList == null) {
        this.categoryList = CategoryResource.query(params).$promise;
      }
      return this.categoryList;
    };
  }]);
