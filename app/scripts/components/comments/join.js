'use strict';

angular.module('xbertsApp')
  .directive('join', ['Interact', '$rootScope', 'Paginator', '$q', 'growl', function (Interact, $rootScope, Paginator, $q, growl) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      controller: function ($scope) {
        //todo:join直接传递过来
        $scope.join = {vote: false};
        $scope.joins = [];
        $scope.feedbacks = [];
        $scope.loadingJoin = true;
        $scope.voting = false;
        this.getJoin = function () {
          return $scope.join;
        };
        this.participate = function (vote) {
          //todo: 返还一个promise对象
          if (!$rootScope.user.authRequired()) {
            return
          }
          $scope.voting = true;
          if (vote) {
            $scope.interact.vote_amount += 1;
          } else {
            if ($scope.join.id !== undefined && $scope.interact.vote_amount > 0) {
              $scope.interact.vote_amount -= 1;
            }
          }
          var Join = Interact.Join({});
          if ($scope.join.id === undefined) {
            $scope.join = new Join();
            $scope.join.interact = $scope.interact.id;
            $scope.join.vote = vote;
            $scope.join.$save(function (result) {
              $scope.voting = false;
              if (result.vote) {
                $scope.joins.push(result);
              }
            }, function (error) {
              $scope.voting = false;
              growl.error('error');
            });
          } else {
            $scope.join = new Join($scope.join);
            $scope.join.vote = vote;
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
            });
          }
        };
        this.participatePromise = function () {
          var delay = $q.defer();
          var Join = Interact.Join({});
          if ($scope.join.id === undefined) {
            $scope.join = new Join();
            $scope.join.interact = $scope.interact.id;
            $scope.join.vote = false;
            $scope.join.$save(function () {
              delay.resolve($scope.join);
            }, function (error) {
              delay.reject('Some error happened.');
              growl.error('error');
            });
            return delay.promise;
          }
        };
        this.leaveComment = function (content, callback) {
          var delay = $q.defer();
          var Comment = Interact.Comment({});
          var comment = new Comment(content);
          callback();
          comment.post_id = $scope.join.id;
          comment.$save(function () {
            delay.resolve(comment);
          }, function (error) {
            delay.reject('Some error happened.');
            growl.error('error');
          });
          return delay.promise;
        };
        $scope.init = function (interact) {
          //todo:join直接传递过来
          $scope.interact = interact;
          $scope.referenceId = 'interact_' + $scope.interact.id;
          if ($rootScope.user.isAuth()) {
            var joinResult = Interact.Join({interact_id: $scope.interact.id, joiner_id: $rootScope.user.getUserId()});
            joinResult.get(function (data) {
              if (data.count !== undefined && data.count > 0) {
                $scope.join = data.results[0];
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
          });
        };
        this.leaveFeedback = function (content, callback) {
          if (!$rootScope.user.authRequired()) {
            return
          }
          var Feedback = Interact.Feedback({});
          var feedback = new Feedback(content);
          callback();
          feedback.interact = $scope.interact.id;
          if ($scope.join.id !== undefined) {
            feedback.post = $scope.join.id;
            feedback.$save(function () {
              $scope.feedbackPaginator.items.unshift(feedback);
              $scope.interact.feedback_amount += 1;
              growl.success('success', {referenceId: $scope.referenceId});
            }, function (error) {
              growl.error('error', {referenceId: $scope.referenceId});
            });
          } else {
            this.participatePromise().then(function () {
              feedback.post = $scope.join.id;
              feedback.$save(function () {
                $scope.feedbackPaginator.items.unshift(feedback);
                growl.success('success', {referenceId: $scope.referenceId});
              }, function (error) {
                growl.error('error', {referenceId: $scope.referenceId});
              });
            }, function (error) {
              growl.error('error', {referenceId: $scope.referenceId});
            })
          }
        };
        $scope.getFeedbackPaginator = function () {
          var par = {
            name: 'feedback_' + $scope.interact.id,
            fetchFunction: function (params) {
              return Interact.Feedback({interact_id: $scope.interact.id}).get(params).$promise;
            }
          };
          $scope.feedbackPaginator = new Paginator(par);
          $scope.feedbackPaginator.clear();
          $scope.feedbackPaginator.loadNext();
        };
      }

    };
  }])
