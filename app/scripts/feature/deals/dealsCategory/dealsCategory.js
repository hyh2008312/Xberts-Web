angular.module('xbertsApp')
  .directive('dealsCategory', ['DealsService','$mdMedia',function (DealsService,$mdMedia) {
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
            if(index > 11) {
              scope.page = 1;
            }
          }
        });

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...
          var width = !$mdMedia('xs') ? 100: 88;
          angular.element('.xb-deals-categories').animate({
            scrollLeft:index * width + 'px'
          },0);
        });


      }
    }
  }]);
