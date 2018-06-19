'use strict';

angular.module('xbertsApp')
  .controller('SearchResultCtrl', ['$rootScope','$scope','SearchService','$stateParams','SearchFactory','Paginator',
    'SearchModel',
    function ($rootScope,$scope,SearchService,$stateParams,SearchFactory,Paginator,SearchModel) {

      SearchFactory.keywords = $stateParams.q;
      $scope.keywords = SearchFactory.keywords;
      SearchService.getSearch({
        'search_info': $stateParams.q
      }).then(function(data) {

        $scope.productCount = data.productCount;
        $scope.askCount = data.askCount;
        $scope.articlesCount = data.articlesCount;

        $scope.products = SearchModel.buildList(data.product);
        $scope.ask = SearchModel.buildList(data.ask);
        $scope.articles = SearchModel.buildList(data.articles);
      });

      $scope.currentIndex = SearchFactory.sort;

      $scope.changeCurrentIndex = function($index) {
        $scope.currentIndex = $index;
      };

      $scope.productsPaginatorLoad = function() {
        if(SearchFactory.productFrom != null) {
          $scope.productsPaginator.params.from = SearchFactory.productFrom;
        }
        $scope.productsPaginator.loadNext();
      };

      $scope.loadDiscover = function() {
        if($scope.productsPaginator) {
           return;
        }
        var par = {
          name: 'xb-search-product' + $stateParams.q,
          objClass: SearchModel,
          params: {
            'search_info': $stateParams.q,
            'page_size': 12
          },
          fetchFunction: SearchService.getProductSearch
        };
        $scope.productsPaginator = new Paginator(par);
        $scope.productsPaginator.load();
      };

      $scope.askPaginatorLoad = function() {
        if(SearchFactory.askFrom != null) {
          $scope.askPaginator.params.from = SearchFactory.askFrom;
        }
        $scope.askPaginator.loadNext();
      };

      $scope.loadAsk = function() {
        if($scope.askPaginator) {
          return;
        }

        var par = {
          name: 'xb-search-ask' + $stateParams.q,
          objClass: SearchModel,
          params: {
            'search_info': $stateParams.q,
            'page_size': 12
          },
          fetchFunction: SearchService.getAskSearch
        };
        $scope.askPaginator = new Paginator(par);
        $scope.askPaginator.load();
      };

      $scope.articlesPaginatorLoad = function() {
        if(SearchFactory.articlesFrom != null) {
          $scope.articlesParginator.params.from = SearchFactory.articlesFrom;
        }
        $scope.articlesParginator.loadNext();
      };

      $scope.loadArticles = function() {
        if($scope.articlesParginator) {
          return;
        }

        var par = {
          name: 'xb-search-articles' + $stateParams.q,
          objClass: SearchModel,
          params: {
            'search_info': $stateParams.q,
            'page_size': 12
          },
          fetchFunction: SearchService.getArticlesSearch
        };
        $scope.articlesParginator = new Paginator(par);
        $scope.articlesParginator.load();
      };

      var title = 'Xberts - ' + $stateParams.q;
      var description = $stateParams.q;
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
