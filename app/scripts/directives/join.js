'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:join
 * @description
 * # join
 */
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
          console.log(comment);
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
            console.log(feedback);
            feedback.$save(function () {
              $scope.feedbackPaginator.items.unshift(feedback);
              growl.success('success', {referenceId: $scope.referenceId});
            }, function (error) {
              growl.error('error', {referenceId: $scope.referenceId});
            });
          } else {
            this.participatePromise().then(function () {
              feedback.post = $scope.join.id;
              console.log(feedback);
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
          var fetchFunction = function (nextPage, otherParams, callback) {
            var feedbacksResult = Interact.Feedback({interact_id: $scope.interact.id});
            var params = {page: nextPage};
            angular.extend(params, otherParams);
            feedbacksResult.get(params, callback);
          };
          $scope.feedbackPaginator = Paginator('feedback_' + $scope.interact.id, fetchFunction);
          $scope.feedbackPaginator.clear();
          $scope.feedbackPaginator.loadNext();
          //$scope.feedbackPaginator.watch($scope,'feedbackPaginator.items.length');
        };
      }

    };
  }])
  .directive('eventJoin', ['$rootScope', '$q', 'growl', 'EventJoin', function ($rootScope, $q, growl, EventJoin) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        eventId:'='
      },
      controller: function ($scope) {
        this.getJoin = function () {
          return $scope.join;
        };
        this.participatePromise = function () {
          var delay = $q.defer();
          $scope.join = new EventJoin({event_id: $scope.eventId, user_id: $rootScope.user.getUserId()});
          $scope.join.$save(function () {
            delay.resolve($scope.join);
          }, function (error) {
            delay.reject('Some error happened.');
            growl.error('error');
          });
          return delay.promise;
        };
      },
      link: function postLink(scope, element, attrs, eventJoinCtrl) {
        scope.join = {vote: false};
        scope.loadingJoin = true;
        if ($rootScope.user.isAuth()) {
          EventJoin.get({event_id: scope.eventId, user_id: $rootScope.user.getUserId()}, function (data) {
            if (data.count !== undefined && data.count > 0) {
              scope.join = data.results[0];
              console.log(scope.join);
            }
            scope.loadingJoin = false;
          });
        } else {
          scope.loadingJoin = false;
        }
      }
    };
  }])
  .directive('eventProjectVote', ['$rootScope', '$q', 'growl', '$uibModal', 'EventProjectVote', function ($rootScope, $q, growl, $uibModal, EventProjectVote) {
    return {
      restrict: 'E',
      templateUrl: '/views/eventproject.html',
      replace: false,
      scope: {
        eventProject: '='
      },
      require: '^eventJoin',
      link: function postLink(scope, element, attrs, eventJoinCtrl) {
        //element.text('this is the QuestionInput directive');
        scope.voting = false;
        scope.open = function (size) {
          //if (!$rootScope.user.authRequired()) {
          //  return
          //}
          var modalInstance = $uibModal.open({
            templateUrl: '/views/eventprojectvote.html',
            controller: 'EventProjectVoteCtrl',
            size: size
          });
        };
        scope.vote = function () {
          //先判断是否是参与者,(如果不是则先创建参与者)
          if (eventJoinCtrl.getJoin()) {
            scope.voteResource = new EventProjectVote();
            scope.voteResource.save(function () {
              //加入vote list
              var join = eventJoinCtrl.getJoin();
              join.vote_remain -= 1;
              join.projects.append(scope.voteResource.event_project);
              scope.voting = false;
              //project的投票数+1
              scope.eventProject.vote_amount += 1;
              growl.success('success', {referenceId: $scope.referenceId});
            }, function () {
              growl.error('error', {referenceId: $scope.referenceId});
              scope.voting = false;
            })
          }
        };
      }
    };
  }]);
