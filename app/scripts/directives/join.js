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
        eventId: '='
      },
      controller: function ($scope) {
        $scope.join = null;
        this.getJoin = function () {
          return $scope.join;
        };
        $scope.projects = [];
        this.addProject = function (project) {
          $scope.projects.push(project);
        };
        this.initProjects = function () {
          angular.forEach($scope.projects, function (project) {
            if ($scope.join && $scope.join.event_projects) {
              project.maxVote = $scope.join.vote_remain <= 0;
              var i = 0;
              for (i = 0; i < $scope.join.event_projects.length; i++) {
                if ($scope.join.event_projects[i] === project.eventProject.id) {
                  break;
                }
              }
              if (i < $scope.join.event_projects.length) {
                project.voted = true || $scope.loadingJoin;
              } else {
                project.voted = false;
              }
            }
          });
        };
        this.participatePromise = function () {
          var delay = $q.defer();
          $scope.join = new EventJoin({event: $scope.eventId, user: $rootScope.user.getUserId()});
          $scope.join.$save(function () {
            delay.resolve($scope.join);
          }, function (error) {
            delay.reject('Some error happened.');
            growl.error('error');
          });
          return delay.promise;
        };
        $scope.$watch('join', this.initProjects, true);
        $scope.$watch('projects.length', this.initProjects);
        $scope.$watch('loadingJoin', this.initProjects);
      },
      link: function postLink(scope, element, attrs, eventJoinCtrl) {
        scope.loadingJoin = true;
        if ($rootScope.user.isAuth()) {
          EventJoin.query({event_id: scope.eventId, user_id: $rootScope.user.getUserId()}, function (data) {
            if (data.length > 0) {
              scope.join = data[0];
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
      templateUrl: 'views/eventproject.html',
      replace: false,
      scope: {
        eventProject: '='
      },
      require: '^eventJoin',
      link: function postLink(scope, element, attrs, eventJoinCtrl) {
        scope.voting = false;
        scope.voted = false;
        scope.maxVote = false;
        scope.referenceId = "event_project_" + scope.eventProject.id;
        eventJoinCtrl.addProject(scope);
        scope.open = function (size) {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          scope.voting = true;
          var modalInstance = $uibModal.open({
            templateUrl: 'views/eventprojectvote.html',
            controller: 'EventProjectVoteCtrl',
            size: size
          });
          modalInstance.result.then(function (reason) {
            scope.eventProjectVote = {
              reason: reason,
              event_project: scope.eventProject.id
            };
            scope.vote();
          }, function () {
            scope.voting = false;
          });
        };
        scope.vote = function () {
          if (eventJoinCtrl.getJoin()) {
            var join = eventJoinCtrl.getJoin();
            scope.eventProjectVote.event_joiner = join.id;
            scope.voteResource = new EventProjectVote(scope.eventProjectVote);
            scope.voteResource.$save(function () {
              join.vote_remain -= 1;
              join.event_projects.push(scope.voteResource.event_project);
              scope.voted = true;
              scope.voting = false;
              scope.eventProject.vote_amount += 1;
              growl.success('Thank you for your vote!', {referenceId: scope.referenceId});
            }, function () {
              growl.error('error', {referenceId: scope.referenceId});
              scope.voting = false;
            })
          } else {
            eventJoinCtrl.participatePromise().then(function () {
              var join = eventJoinCtrl.getJoin();
              scope.eventProjectVote.event_joiner = join.id;
              scope.voteResource = new EventProjectVote(scope.eventProjectVote);
              scope.voteResource.$save(function () {
                join.vote_remain -= 1;
                join.event_projects.push(scope.voteResource.event_project);
                scope.voted = true;
                scope.voting = false;
                scope.eventProject.vote_amount += 1;
                growl.success('Thank you for your vote!', {referenceId: scope.referenceId});
              }, function () {
                growl.error('error', {referenceId: scope.referenceId});
                scope.voting = false;
              })
            }, function (error) {
              growl.error('error', {referenceId: scope.referenceId});
            })
          }
        }
      }
    }
  }])
  .directive('eventJoinOff', ['$rootScope', '$q', 'growl', 'EventJoin', function ($rootScope, $q, growl, EventJoin) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        eventId: '='
      },
      controller: function ($scope) {
        $scope.join = null;
        this.getJoin = function () {
          return $scope.join;
        };
        $scope.projects = [];
        this.addProject = function (project) {
          $scope.projects.push(project);
        };
        this.initProjects = function () {
          angular.forEach($scope.projects, function (project) {
            if ($scope.join && $scope.join.event_projects) {
              project.maxVote = $scope.join.vote_remain <= 0;
              var i = 0;
              for (i = 0; i < $scope.join.event_projects.length; i++) {
                if ($scope.join.event_projects[i] === project.eventProject.id) {
                  break;
                }
              }
              if (i < $scope.join.event_projects.length) {
                project.voted = true || $scope.loadingJoin;
              } else {
                project.voted = false;
              }
            }
          });
        };
        this.participatePromise = function () {
          var delay = $q.defer();
          $scope.join = new EventJoin({event: $scope.eventId, user: $rootScope.user.getUserId()});
          $scope.join.$save(function () {
            delay.resolve($scope.join);
          }, function (error) {
            delay.reject('Some error happened.');
            growl.error('error');
          });
          return delay.promise;
        };
        $scope.$watch('join', this.initProjects, true);
        $scope.$watch('projects.length', this.initProjects);
        $scope.$watch('loadingJoin', this.initProjects);
      },
      link: function postLink(scope, element, attrs, eventJoinCtrl) {
        scope.loadingJoin = true;
        if ($rootScope.user.isAuth()) {
          EventJoin.query({event_id: scope.eventId, user_id: $rootScope.user.getUserId()}, function (data) {
            if (data.length > 0) {
              scope.join = data[0];
            }
            scope.loadingJoin = false;
          });
        } else {
          scope.loadingJoin = false;
        }
      }
    };
  }])
  .directive('eventProjectVoteOff', ['$rootScope', '$q', 'growl', '$uibModal', 'EventProjectVote', 'AuthService', 'SignupService', function ($rootScope, $q, growl, $uibModal, EventProjectVote, AuthService, SignupService) {
    return {
      restrict: 'E',
      templateUrl: 'views/eventproject.html',
      replace: false,
      scope: {
        eventProject: '='
      },
      require: '^eventJoinOff',
      link: function postLink(scope, element, attrs, eventJoinCtrl) {
        scope.voting = false;
        scope.voted = false;
        scope.maxVote = false;
        scope.referenceId = "event_project_" + scope.eventProject.id;
        eventJoinCtrl.addProject(scope);
        scope.open = function (size) {
          scope.voting = true;
          var modalInstance = $uibModal.open({
            templateUrl: 'views/eventprojectvoteoffline.html',
            controller: 'EventProjectVoteOffCtrl',
            size: size
          });
          modalInstance.result.then(function (voter) {
            scope.eventProjectVote = {
              reason: voter.reasons,
              event_project: scope.eventProject.id
            };
            if ($rootScope.user.isAuth()) {
              scope.vote();
            } else {
              SignupService.signup.save({
                firstName: voter.firstName,
                lastName: voter.lastName,
                email: voter.email,
                password: 'ces2016',
                country: voter.country,
                groupName: 'ces2016'
              }).$promise
                .then(function (value) {
                  return AuthService.login({
                    username: value.email,
                    password: 'ces2016'
                  });
                })
                .then(function(value) {
                  scope.vote();
                })
                .catch(function (resp) {
                  scope.voting = false;
                  growl.error('error', {referenceId: scope.referenceId});
                });
            }
          }, function () {
            scope.voting = false;
          });
        };
        scope.vote = function () {
          if (eventJoinCtrl.getJoin()) {
            var join = eventJoinCtrl.getJoin();
            scope.eventProjectVote.event_joiner = join.id;
            scope.voteResource = new EventProjectVote(scope.eventProjectVote);
            scope.voteResource.$save(function () {
              join.vote_remain -= 1;
              join.event_projects.push(scope.voteResource.event_project);
              scope.voted = true;
              scope.voting = false;
              scope.eventProject.vote_amount += 1;
              growl.success('Thank you for your vote!', {referenceId: scope.referenceId});
            }, function () {
              growl.error('error', {referenceId: scope.referenceId});
              scope.voting = false;
            })
          } else {
            eventJoinCtrl.participatePromise().then(function () {
              var join = eventJoinCtrl.getJoin();
              scope.eventProjectVote.event_joiner = join.id;
              scope.voteResource = new EventProjectVote(scope.eventProjectVote);
              scope.voteResource.$save(function () {
                join.vote_remain -= 1;
                join.event_projects.push(scope.voteResource.event_project);
                scope.voted = true;
                scope.voting = false;
                scope.eventProject.vote_amount += 1;
                growl.success('Thank you for your vote!', {referenceId: scope.referenceId});
              }, function () {
                growl.error('error', {referenceId: scope.referenceId});
                scope.voting = false;
              })
            }, function (error) {
              growl.error('error', {referenceId: scope.referenceId});
            })
          }
        }
      }
    }
  }]);
