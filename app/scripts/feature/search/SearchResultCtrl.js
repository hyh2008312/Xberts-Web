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

        $scope.products = SearchModel.buildList(data.product);
        $scope.ask = SearchModel.buildList(data.ask);
        $scope.productCount = data.productCount;
        $scope.askCount = data.askCount;
        $scope.reviews = SearchModel.buildList(data.reviews);
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

      var title = 'Xberts - ' + $stateParams.q;
      var description = $stateParams.q;
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
