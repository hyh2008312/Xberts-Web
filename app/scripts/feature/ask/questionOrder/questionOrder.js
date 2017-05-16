angular.module('xbertsApp')
  .directive('questionOrder',function () {
    return {
      restrict: 'E',
      scope: {
        askCtrl: '=',
        index: '='
      },
      templateUrl: 'scripts/feature/ask/questionOrder/question-order.html',
      link: function (scope, element, attrs, ctrls) {
        scope.orderList = ['latest','need help'];

        scope.changeOrder = function(index) {
          scope.index = index;
          scope.askCtrl.changeOrder(scope.index);
        }
      }
    }
  });
