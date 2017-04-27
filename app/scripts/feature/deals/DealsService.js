angular.module('xbertsApp')
  .service('DealsService', ['$resource','ProductDeals','API_BASE_URL',function ($resource,ProductDeals,API_BASE_URL) {

    var DealsProductResource = $resource(API_BASE_URL + '/deals/');

    this.categoryId = null;
    this.sortId = null;
    this.priceId = null;
    this.discountId = null;

    this.getDealsList = function(params) {
      return DealsProductResource.get(params).$promise.then(ProductDeals.buildPageList);
    };

    this.getSort = function() {
      return [{
        id: '0',
        name: 'Latest'
      },{
        id: '1',
        name: 'Most Popular'
      },{
        id: '2',
        name: 'Ending Soon'
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
        name: '50 to $100',
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
    }

  }]);
