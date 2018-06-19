angular.module('xbertsApp')
  .directive('dealsCategory', ['DealsService','$mdMedia',
    function (DealsService,$mdMedia) {
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
            scope.page = Math.floor(index / 4);
          }
        });

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...
          var width = !$mdMedia('xs') ? 100: 88;
          element.find('.xb-deals-categories').animate({
            scrollLeft:index * width + 'px'
          },0);
          if($mdMedia('xs')) {
            scope.page = Math.floor(index / 4);
          }
        });

      }
    }
  }]);
