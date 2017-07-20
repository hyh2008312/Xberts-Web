'use strict';

angular.module('xbertsApp')
  .service('DealsService', ['$resource','ProductDeals','API_BASE_URL',function ($resource,ProductDeals,API_BASE_URL) {

    var DealsProductResource = $resource(API_BASE_URL + '/products/:id/',{id:'@id'},{'patch': {method: 'PATCH'}});
    var DealsProductRelatedResource = $resource(API_BASE_URL + '/products/:id/related/',{id:'@id'});

    this.categoryId = null;
    this.priceId = null;
    this.discountId = null;

    this.getDealsList = function(params) {
      return DealsProductResource.get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.getDetail = function(dealsId) {
      return DealsProductResource.get({id:dealsId}).$promise.then(ProductDeals.build);
    };

    this.getRecommendList = function(id) {
      return DealsProductRelatedResource.query({id:id}).$promise.then(ProductDeals.buildList);
    };

    this.update = function(data) {
      return DealsProductResource.patch(data).$promise.then(ProductDeals.build);
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

    this.getSort = function() {
      return [{
        value: 'everything',
        name: 'All'
      },{
        value: 'promotion',
        name: ' Lightning Deals'
      },{
        value: "cool",
        name: 'Best Selling'
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

  }]);
