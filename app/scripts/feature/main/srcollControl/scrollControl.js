angular.module('xbertsApp')
  .directive('scrollControl', ['$window', function($window) {
    return {
      restrict: 'A',
      scope: {
        direction : '=',
        scrollElement : '=',
        page : '=',
        pageSize : '=',
        distance : '=',
        amount : '='
      },
      link: function (scope, element, attrs, ctrls) {
        element.on("click", function() {
          if(scope.direction == 1) {
            scope.page++;
            if(scope.page > scope.amount / scope.pageSize - 1) {
              scope.page--;
            }
            angular.element(scope.scrollElement).animate({
                scrollLeft:scope.page * scope.pageSize * scope.distance + 'px'
            },1000);
          } else {
            scope.page--;
            if(scope.page < 0) {
              scope.page = 0;
            }
            angular.element(scope.scrollElement).animate({
              scrollLeft:scope.page * scope.pageSize * scope.distance + 'px'
            },1000);
          }
        });
       }
    }
  }]);
