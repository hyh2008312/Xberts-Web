angular.module('xbertsApp')
  .directive('myTrials', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      scope: {
        trials: '='
      },
      templateUrl: 'scripts/feature/profile/myTrials/my-trials.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;
      }
    }
  }]);
