angular.module('xbertsApp')
  .directive('filterSwitcher', function () {
    return {
      restrict: 'E',
      scope: {
        value: '='
      },
      templateUrl: 'scripts/feature/deals/filterSwitcher/filter-switcher.html',
      link: function (scope, element, attrs, ctrls) {
        scope.onSwitch = function() {
          scope.value = !scope.value;
        };
      }
    }
  });
