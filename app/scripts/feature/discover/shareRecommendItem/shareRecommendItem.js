angular.module('xbertsApp')
  .directive('shareRecommendItem', function () {
    return {
      restrict: 'E',
      scope: {
        product: '='
      },
      templateUrl: 'scripts/feature/discover/shareRecommendItem/share-recommend-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.product = scope.product || [];

      }
    }
  });
