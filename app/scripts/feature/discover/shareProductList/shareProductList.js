angular.module('xbertsApp')
  .directive('shareProductList', ['$window',function ($window) {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/discover/shareProductList/share-product-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.products = scope.products || [];

        angular.element('.xb-body-view').on('scroll', function() {
          angular.forEach(angular.element('.product__video'),function(e,i) {
            var $item = angular.element(e);
            if($item.length > 0) {
              var index = $item.attr('index');
              var _height = $item.outerHeight();
              if($item.offset().top + _height < 150) {
                scope.products[index].isLocation = true;
              } else if($item.offset().top > angular.element($window).height() - 100) {
                scope.products[index].isLocation = true;
              } else {
                scope.products[index].isLocation = false;
              }
            }
            scope.$apply();
          });
        });

      }
    }
  }]);
