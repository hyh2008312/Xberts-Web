'use strict';

angular.module('xbertsApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal', 'Paginator','ReviewService',
    'Interact', 'expert', 'ApplicationService', 'Sales', 'SystemConstant', 'ProductDeals','ExpertService',
    'AskModel','localStorageService','achievement',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal, Paginator, ReviewService, Interact, expert,
              ApplicationService, Sales, SystemConstant, ProductDeals, ExpertService,AskModel,
              localStorageService,achievement) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;
      $scope.isExpert = _($scope.expert.roles).contains(SystemConstant.ROLES.DOMAIN_EXPERT);
      $scope.achievement = achievement;

      $scope.showBio = false;

      $scope.openBio = function() {
        $scope.showBio = !$scope.showBio;
      };

      $scope.selectedIndex = 0;

      var tabIndexToParam = ['profile', 'questions', 'crowdtesting', 'deals', 'articles', 'following',
        'follower','question_followed'];

      var updateUrl = function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $location.search('tab', $scope.selectedIndex >= 0?tabIndexToParam[$scope.selectedIndex.toString()]:null);
          });
        }, 0);
      };

      var updateActiveTabOnSearch = function () {
        var tab = $location.search().tab;
        $scope.selectedIndex = parseInt(tabIndexToParam.findIndex(function(x) {
          return x == tab;
        }));
        if($rootScope.state.current.name == 'application.expert') {
          if($scope.selectedIndex < 0) {
            $scope.selectedIndex = 0;
          }
        }
      };

      updateActiveTabOnSearch();

      $scope.$on('$locationChangeSuccess', function () {
        updateActiveTabOnSearch();
      });

      $scope.loadContent = function(index) {
        $scope.selectedIndex = index;
        updateUrl();
      };

      var filter = '';
      if ($rootScope.user.getUserId() != expert.userId) {
        filter = {is_submit_report: true};
      }
      var par = {
        name: 'trials_' + $scope.expert.userId,
        params: {reviewer_id: $scope.expert.userId},
        filter: filter,
        fetchFunction: ApplicationService.getApplications
      };
      $scope.reviewApplicantPaginator = new Paginator(par);

      var par = {
        name: 'campaigns_' + $scope.expert.userId,
        params: {owner: $scope.expert.userId},
        fetchFunction: ReviewService.getList
      };
      $scope.campaignPaginator = new Paginator(par);

      var par = {
        name: 'posts_' + $scope.expert.userId,
        objClass: ProductDeals,
        params: {
          id: $scope.expert.userId,
          page_size:12
        },
        fetchFunction: ExpertService.getPostList
      };
      $scope.postsProductPaginator = new Paginator(par);

      var parQuestion = {
        name: 'questions_list_' + $scope.expert.userId,
        objClass: AskModel,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getQuestionsList
      };
      $scope.postsQuestionPaginator = new Paginator(parQuestion);

      var parAnswers = {
        name: 'answers_list_' + $scope.expert.userId,
        objClass: AskModel,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getAnswersList
      };
      $scope.postsAnswerPaginator = new Paginator(parAnswers);

      var parArticles = {
        name: 'articles_' + $scope.expert.userId,
        objClass: MainModel,
        params: {
          owner__id : $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getArticles
      };
      $scope.postsArticlesPaginator = new Paginator(parArticles);

      var parfollowing = {
        name: 'followings_list_' + $scope.expert.userId,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.followees
      };
      $scope.followingPaginator = new Paginator(parfollowing);

      var parfollower = {
        name: 'followers_list_' + $scope.expert.userId,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.followers
      };
      $scope.followerPaginator = new Paginator(parfollower);

      var parfollowingQuestions = {
        name: 'following_answers_list_' + $scope.expert.userId,
        objClass: AskModel,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getFollowingQuestion
      };
      $scope.followingQuestionsPaginator = new Paginator(parfollowingQuestions);

      $scope.contactUser = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        var sendMessageModal = $uibModal.open({
          templateUrl: 'views/modal/send-message.html',
          windowClass: 'dialog-vertical-center',
          controller: 'SendMessageCtrl',
          resolve: {
            recipientId: function () {
              return $scope.expert.userId;
            }
          }
        });
      };

      $scope.addFollow = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        ExpertService.follow({id:expert.userId}).then(function(data) {
          $scope.expert.currentUser.follow = data.follow;
          if(data.follow == false && $scope.achievement && $rootScope.user.getUserId() != $scope.expert.userId) {
            $scope.achievement.followersAmount--;
          }
          if(data.follow == true && $scope.achievement && $rootScope.user.getUserId() != $scope.expert.userId) {
            $scope.achievement.followersAmount++;
          }
          localStorageService.remove('followings_list_' + $rootScope.user.getUserId() + '_currentPage');
          localStorageService.remove('followings_list_' + $rootScope.user.getUserId() + '_items');
          localStorageService.remove('followings_list_' + $rootScope.user.getUserId() +'_next');
          localStorageService.remove('followings_list_' + $rootScope.user.getUserId() +'_count');
          localStorageService.remove('followers_list_' + $rootScope.user.getUserId() + '_currentPage');
          localStorageService.remove('followers_list_' + $rootScope.user.getUserId() + '_items');
          localStorageService.remove('followers_list_' + $rootScope.user.getUserId() +'_next');
          localStorageService.remove('followers_list_' + $rootScope.user.getUserId() +'_count');
        }, function() {

        });
      };

      $scope.editProfile = function () {
        $state.go('application.protected.editProfile');
      };

    }]);
