'use strict';

angular.module('xbertsApp')
  .directive('reviewsList', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        reviews: '=',
        reviewsFeatured: '=',
        onReviewsFollow: '&',
        featured: '='
      },
      templateUrl: 'scripts/feature/review/reviewsList/reviews-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.changeOrder  = function($index) {
          return Math.floor($index / 8);
        };

      }
    }
  }]);

