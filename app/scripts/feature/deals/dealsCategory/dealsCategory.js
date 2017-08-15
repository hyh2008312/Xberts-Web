angular.module('xbertsApp')
  .directive('dealsCategory', ['DealsService','$mdMedia','BrowserUtil',function (DealsService,$mdMedia,BrowserUtil) {
    return {
      restrict: 'E',
      scope: {
        categories: '=',
        onCategoryChange: '&',
        categoryId: '=',
        categoryTab: '='
      },
      templateUrl: 'scripts/feature/deals/dealsCategory/deals-category.html',
      link: function (scope, element, attrs, ctrls) {

        scope.page = 0;

        var index = 0;

        angular.forEach(DealsService.getCategoryList,function(e, i) {
          if(e.value == scope.categoryTab) {
            index = i;
            scope.page = Math.floor(index / 3);
          }
        });

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...
          var width = !$mdMedia('xs') ? 100: 88;
          angular.element('.xb-deals-categories').animate({
            scrollLeft:index * width + 'px'
          },0);
          if($mdMedia('xs')) {
            scope.page = Math.floor(index / 3);
          }
        });

        scope.onSwipeLeft = function() {
          var width = !$mdMedia('xs') ? 100: 88;
          scope.page++;
          if(scope.page > scope.categories.length / 3) {
            scope.page = Math.floor(scope.categories.length / 3);
          }
          angular.element('.xb-deals-categories').animate({
            scrollLeft:3 * scope.page * width + 'px'
          },300);

        };

        scope.onSwipeRight= function() {
          var width = !$mdMedia('xs') ? 100: 88;
          scope.page--;
          if(scope.page < 0) {
            scope.page = 0;
          }
          angular.element('.xb-deals-categories').animate({
            scrollLeft:3 * scope.page * width + 'px'
          },300);
        };

        scope.$watch(function() { return BrowserUtil.isMobile(); }, function(data) {
          scope.isMobile = data;
        });

      }
    }
  }]);
