'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:join
 * @description
 * # join
 */
angular.module('yeodjangoApp')
  .directive('join', ['Interact', '$rootScope', '$filter', function (Interact, $rootScope, $filter) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      controller: function ($scope) {
        //todo:join直接传递过来
        $scope.join = {};
        $scope.joins = [];
        $scope.loadingJoin = true;
        $scope.voting = false;
        this.participate = function (vote) {
          //todo: 返还一个promise对象
          $scope.voting = true;
          if (vote) {
            $scope.interact.vote_amount += 1;
          } else {
            if ($scope.interact.vote_amount > 0) {
              $scope.interact.vote_amount -= 1;
            }
          }
          var Join = Interact.Join({});
          if ($scope.join.id === undefined) {
            $scope.join = new Join();
            $scope.join.interact = interact.id;
            $scope.join.vote = vote;
            $scope.join.$save(function (result) {
              $scope.voting = false;
            }, function (error) {
              $scope.voting = false;
              alert('Some error happened.');
            });
          } else {
            $scope.join = new Join($scope.join);
            $scope.join.vote = vote;
            console.log("vote");
            $scope.join.$vote(function (result) {
              $scope.voting = false;
              if (result.vote) {
                $scope.joins.push(result);
              } else {
                for (var i = 0; i < $scope.joins.length; i++) {
                  if ($scope.joins[i].id === result.id) {
                    $scope.joins.splice(i, 1);
                  }
                }
              }
            })
          }
        };
        $scope.init = function (interact) {
          //todo:join直接传递过来
          console.log(interact);
          $scope.interact = interact;
          if ($rootScope.user.isAuth()) {
            var joinResult = Interact.Join({interact_id: $scope.interact.id, joiner_id: $rootScope.user.getUserId()});
            joinResult.get(function (data) {
              if (data.count !== undefined && data.count > 0) {
                $scope.join = data.results[0];
                console.log($scope.join);
              }
              $scope.loadingJoin = false;
            });
          } else {
            $scope.loadingJoin = false;
          }
          var joinsResult = Interact.Join({interact_id: $scope.interact.id, vote: 'True'});
          joinsResult.get(function (data) {
            if (data.count !== undefined && data.count > 0) {
              $scope.joins = data.results;
            }
            console.log(data);
          });
        }
      }
    };
  }]);
