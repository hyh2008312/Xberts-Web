'use strict';

angular.module('xbertsApp')
  .service('SearchService', ['$resource','API_BASE_URL','SearchModel','SearchFactory',
    function ($resource,API_BASE_URL,SearchModel,SearchFactory) {
    var SearchResource = $resource(API_BASE_URL + '/search/all');
    var SearchAskResource = $resource(API_BASE_URL + '/search/ask');
    var SearchProductResource = $resource(API_BASE_URL + '/search/product')
    var SearchArticlesResource = $resource(API_BASE_URL + '/search/article');

    this.getSearch = function(params) {
      return SearchResource.save(params).$promise;
    };

    this.getAskSearch = function(params) {
      return SearchAskResource.save(params).$promise.then(function(data) {
        SearchFactory.askFrom = data.from;
        return SearchModel.buildPageList(data);
      });
    };

    this.getProductSearch = function(params) {
      return SearchProductResource.save(params).$promise.then(function(data) {
        SearchFactory.productFrom = data.from;
        return SearchModel.buildPageList(data);
      });
    };

    this.getArticlesSearch = function(params) {
      return SearchArticlesResource.save(params).$promise.then(function(data) {
        SearchFactory.articlesFrom = data.from;
        return SearchModel.buildPageList(data);
      });
    };

  }]);
