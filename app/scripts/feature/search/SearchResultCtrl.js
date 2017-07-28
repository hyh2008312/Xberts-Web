'use strict';

angular.module('xbertsApp')
  .controller('SearchResultCtrl', ['$rootScope','$scope','SearchService','$stateParams','SearchFactory','Paginator',
    function ($rootScope,$scope,SearchService,$stateParams,SearchFactory,Paginator) {

      if(SearchFactory.sort == 0) {
        SearchService.getSearch({
          'search_info': $stateParams.question
        }).then(function(data) {
          $scope.products = data.product;
          $scope.ask = data.ask;
          $scope.reviews = data.reviews;
        });
      }

      $scope.currentIndex = SearchFactory.sort;

      $scope.changeCurrentIndex = function($index) {
        $scope.currentIndex = $index;
      };

      $scope.loadDiscover = function() {
        if($scope.askPaginator) {
          $scope.askPaginator.params.from = SearchFactory.from;
          if($scope.askPaginator.count <= 0) return;
        }

        if ($scope.productsPaginator && $scope.productsPaginator.count <= 0) return;
        var par = {
          name: 'xb-search-product' + $stateParams.question,
          params: {
            'search_info': $stateParams.question,
            'page_size': 12
          },
          fetchFunction: SearchService.getProductSearch
        };
        $scope.productsPaginator = new Paginator(par);
      };

      $scope.loadAsk = function() {
        if($scope.askPaginator) {
          $scope.askPaginator.params.from = SearchFactory.from;
          if($scope.askPaginator.count <= 0) return;
        }

        var par = {
          name: 'xb-search-ask' + $stateParams.question,
          params: {
            'search_info': $stateParams.question,
            'page_size': 12
          },
          fetchFunction: SearchService.getAskSearch
        };
        $scope.askPaginator = new Paginator(par);
      };

      var title = 'Xberts';
      var description = 'Xberts is a Y Combinator funded company located in Silicon Valley and China. Our team is comprised of industry experts who are passionate about new technologies and creative designs.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
