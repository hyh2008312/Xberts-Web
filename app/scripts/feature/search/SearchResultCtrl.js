'use strict';

angular.module('xbertsApp')
  .controller('SearchResultCtrl', ['$rootScope','$scope', 'SearchFactory','productsPaginator', 'askPaginator','reviews',
    function ($rootScope,$scope, SearchFactory,productsPaginator, askPaginator,reviews) {

      $scope.currentIndex = SearchFactory.sort;
      $scope.productsPaginator = productsPaginator;
      $scope.askPaginator = askPaginator;
      $scope.reviews = reviews;

      $scope.changeCurrentIndex = function($index) {
        $scope.currentIndex = $index;
      };

      var title = 'Xberts';
      var description = 'Xberts is a Y Combinator funded company located in Silicon Valley and China. Our team is comprised of industry experts who are passionate about new technologies and creative designs.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
