angular.module('xbertsApp')
  .directive('dealsList', ['$rootScope','DealsService',function ($rootScope, DealsService) {
    return {
      restrict: 'E',
      scope: {
        deals: '='
      },
      templateUrl: 'scripts/feature/deals/dealsList/deals-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.deals = scope.deals || [];
        scope.user = $rootScope.user;

        scope.submitForm = function(item){
          if(!$rootScope.user.authRequired()) {
            return;
          }
          // post start
          scope.$emit('backdropOn', 'fetch project');
          var _item = {
            id: item.id,
            buyUrl : item.buyUrl,
            isApproved : item.isApproved
          };
          DealsService.update(_item).then(function (newProduct) {
            scope.$emit('backdropOff', 'project get completed');
            // post end
          }, function () {
            // tips
            scope.$emit('backdropOff', 'project get error');
            // post end
          });
        };
      }
    }
  }]);
