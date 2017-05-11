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
              scope.page=Math.ceil(scope.amount / scope.pageSize) - 1;
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

        angular.element(scope.scrollElement).on('scroll', function(e) {
          e.preventDefault();
          scope.page = Math.floor(e.currentTarget.scrollLeft / (scope.pageSize * scope.distance));
        });
      }
    }
  }]);
