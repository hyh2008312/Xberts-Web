angular.module('xbertsApp')
  .directive('ratingStars', function () {
    return {
      restrict: 'E',
      scope: {
        rating: '=',
        stateOn: '=',
        readOnly: '='
      },
      templateUrl: 'scripts/feature/main/ratingStars/rating-stars.html',
      link: function (scope, element, attrs, ctrls) {

        if(scope.readOnly) {
          scope.rateStar = function($index) {};
        } else {
          scope.rateStar = function($index) {
            scope.rating = $index;
          };
        }

      }
    }
  });
