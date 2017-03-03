angular.module('xbertsApp')
  .directive('interact', ['InteractService', 'Interact', '$rootScope', '$q', function (InteractService, Interact, $rootScope, $q) {
    return {
      restrict: 'E',
      scope: {
        interact: '='
      },

      controller: function ($scope) {


        this.loginCheck = function () {
          return $rootScope.user.isAuth();
        };

        this.getCurrentJoin = function () {
          var delay = $q.defer();

          if (!$rootScope.user.isAuth()) {

          } else {
            if ($scope.currentJoin) {
              delay.resolve($scope.currentJoin);
            } else {
              InteractService.create({interact: $scope.interact.id}).then(function (join) {
                delay.resolve(join);
              });
            }
          }

          return delay.promise;
        };
      },
      controllerAs: 'interactCtrl',
      link: function (scope) {
        scope.interact = Interact.build(scope.interact);
        scope.currentJoin = null;
        if (scope.interactCtrl.loginCheck()) {
          InteractService.getJoin(scope.interact.id, $rootScope.user.getUserId()).then(function (join) {
            scope.currentJoin = join;
          });
        }
      }
    };
  }]);
