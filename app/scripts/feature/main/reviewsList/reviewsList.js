angular.module('xbertsApp')
  .directive('reviewsMainList', function () {
    return {
      restrict: 'E',
      scope: {
        reviews: '='
      },
      templateUrl: 'scripts/feature/main/reviewsList/reviews-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.reviews = scope.reviews || [];

      }
    }
  });
