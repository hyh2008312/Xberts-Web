'use strict';

angular.module('xbertsApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$state', 'modalWrap', 'projectPaginator', 'eventPaginator', 'expertPaginator', 'projectReviewPaginator',
    function ($scope, $rootScope, $state, modalWrap, projectPaginator, eventPaginator, expertPaginator, projectReviewPaginator) {
      $rootScope.pageSettings.setBackgroundColor('');
      $rootScope.pageSettings.setShareImage('https://xberts.com/images/landing_1_1.d836e5d1.jpg');

      $scope.eventPaginator = eventPaginator;
      $scope.projectPaginator = projectPaginator;
      $scope.expertPaginator = expertPaginator;
      $scope.projectReviewPaginator = projectReviewPaginator;

      $scope.isOutDated = function (time) {
        return Date.now() - new Date(time) > 0;
      };
      $scope.active = 0;
      $scope.slides = [
        {
          id: 0,
          image: '/images/landing.png',
          title: 'Connect Brand New Products With Early Adopters',
          subtitle: "Xberts is a global community for early adopters to explore new creative products and share their experience with others",
          buttonText: 'Get Started',
          buttonColor: 'button-primary',
          url: 'application.crowdtestings',
          params: {}
        }
        , {
          id: 1,
          image: '/images/sensative.jpg',
          title: 'Sensative is calling 20 pioneers for crowdtesting',
          subtitle: "Application Deadline<br/>12am PST - Aug 05, 2016 ",
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          url: 'application.crowdtesting',
          params: {reviewId: 31}
        }
      ];

      $scope.slideButtonClick = function (slide) {
        if (slide === $scope.slides[0]) {
          // Special case login for get started button on first slide that's based on user login status
          if ($rootScope.user.isAuth()) {
            $state.go(slide.url, slide.params);
          } else {
            $state.go('application.signup');
          }
        } else {
          $state.go(slide.url, slide.params);
        }
      };
      $scope.want = function (project) {
        var vote = !project.interact.current_voter.vote;
        //todo: 返还一个promise对象
        if (!$rootScope.user.authRequired()) {
          return
        }
        project.voting = true;
        if (vote) {
          project.interact.vote_amount += 1;
        } else {
          if (project.interact.current_voter.id !== undefined && project.interact.vote_amount > 0) {
            project.interact.vote_amount -= 1;
          }
        }
        var Join = Interact.Join({});
        var join;
        if (project.interact.current_voter.id === undefined) {
          join = new Join();
          join.interact = project.interact.id;
          join.vote = vote;
          join.$save(function (result) {
            project.voting = false;
            if (result.vote) {
              project.interact.voters.push(result);
              project.interact.current_voter = result;
            }
          }, function (error) {
            project.voting = false;
            growl.error('error');
          });
        } else {
          join = new Join(project.interact.current_voter);
          join.vote = vote;
          join.$vote(function (result) {
            project.voting = false;
            project.interact.current_voter = result;
            if (result.vote) {
              project.interact.voters.push(result);
            } else {
              for (var i = 0; i < project.interact.voters.length; i++) {
                if (project.interact.voters[i].id === result.id) {
                  project.interact.voters.splice(i, 1);
                }
              }
            }
          });
        }
      };
    }]);
