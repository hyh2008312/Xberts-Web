'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:join
 * @description
 * # join
 */
angular.module('yeodjangoApp')
  .directive('join', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div ng-transclude></div>',
      scope: {
        interact: '='
      },
      controller: function ($scope) {
        this.participate = function (vote) {
          var params = {};
          if ($scope.join === undefined) {
            params.interact = $scope.interact.id;
            params.joiner = $rootScope.user.getUserId();
            var Join = Interact.Join(params);
            $scope.join = new Join();
            $scope.join.interact = $scope.interact.id;
            $scope.join.joiner = $rootScope.user.getUserId();
            $scope.join.vote = vote;
            console.log($scope.join);
            $scope.join.$save(function (result) {
              console.log(result);
              console.log($scope.join);
            }, function (error) {
              alert('Some error happened.');
              console.log(error)
            })
          } else {
            //$scope.join.$put(params,function(){
            //
            //},function(){
            //
            //})
          }

        };
      },
      link: function postLink(scope, element, attrs) {
        scope.joinExist = Interact.Join({interact_id: scope.interact.id, joiner_id: $rootScope.user.getUserId()});
        scope.joinExist.get(function (results) {
          scope.join = results[0];
        });
        scope.joins = Interact.Join({interact_id: scope.interact.id, vote: true});
        scope.joins.get(function (results) {
        });
      }
    };
  }]);
