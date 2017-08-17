'use strict';

angular.module('xbertsApp')
  .directive('reviewsList', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        reviews: '=',
        reviewsFeatured: '=',
        onReviewsFollow: '&'
      },
      templateUrl: 'scripts/feature/review/reviewsList/reviews-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.changeOrder  = function($index) {
          return Math.floor($index / 4) - 20;
        };
        scope.changeOrder1  = function($index) {
          return Math.floor($index / 2) - 20;
        };

      }
    }
  }]);

