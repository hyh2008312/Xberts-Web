angular.module('xbertsApp')
  .directive('socialNetworks', function() {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'scripts/feature/profile/socialNetworks/social-networks.html',
      link: function (scope, element, attrs, ctrls) {
        scope.data = scope.data || [];

        scope.data.cb1 = false;
        scope.data.cb2 = false;
        scope.data.cb3 = false;

        var oldData = angular.copy(scope.data, {});

        scope.saveChange = function () {

        };
        scope.reset = function() {
          scope.data = angular.copy(oldData,{});
          scope.data.avatar = scope.currentAvatar;
        };
      }
    }
  });
