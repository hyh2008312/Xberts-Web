angular.module('xbertsApp')
  .directive('myBiography', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      scope: {
        biography: '='
      },
      templateUrl: 'scripts/feature/profile/myBiography/my-biography.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;
      }
    }
  }]);
