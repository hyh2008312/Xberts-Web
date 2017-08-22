angular.module('xbertsApp')
  .controller('MainPageCtrl', ['$rootScope','topBanner','Paginator','MainService','DealsService','ReviewService',
    'AskService','$stateParams','AuthService','ProductDeals','Review','MainModel',
    'AskModel',
    function ($rootScope, topBanner,Paginator,MainService, DealsService, ReviewService,
              AskService,$stateParams,AuthService,ProductDeals,Review,MainModel,AskModel) {

      if($stateParams.uid && $stateParams.token) {
        AuthService.veridateEmail($stateParams);
      }

      var mainCtrl = this;
      mainCtrl.topBanner = topBanner;

      if(!MainService.dealsPaginator) {
        var par = {
          name: 'deals_main_list',
          objClass: ProductDeals,
          params: {
            page_size: 12
          },
          fetchFunction: DealsService.getDealsList
        };

        mainCtrl.dealsPaginator = new Paginator(par);
        mainCtrl.dealsPaginator.load();
        MainService.dealsPaginator = mainCtrl.dealsPaginator;
      } else {
        mainCtrl.dealsPaginator = MainService.dealsPaginator;
      }

      if(!MainService.latestPaginater) {
        var par = {
          name: 'trials',
          objClass: Review,
          params: {
            page_size: 6,
            review_type: 'FREE_SAMPLE'
          },
          fetchFunction: ReviewService.getList
        };
        mainCtrl.latestPaginater = new Paginator(par);
        mainCtrl.latestPaginater.load();
        MainService.latestPaginater = mainCtrl.latestPaginater;
      } else {
        mainCtrl.latestPaginater = MainService.latestPaginater;
      }

      if(!MainService.reviewsFeaturedTop) {
        var par = {
          name: 'all_review_list_featured_top',
          objClass: MainModel,
          params: {
            is_recommended: 'True',
            edit_status: 'PUBLISHED',
            approval_status: 'APPROVED',
            page_size: 4
          },
          fetchFunction: ReviewService.getArticleList
        };
        mainCtrl.reviewsFeaturedTop = new Paginator(par);
        mainCtrl.reviewsFeaturedTop.load();
        MainService.reviewsFeaturedTop = mainCtrl.reviewsFeaturedTop;
      } else {
        mainCtrl.reviewsFeaturedTop = MainService.reviewsFeaturedTop;
      }

      if(!MainService.askPaginator) {
        var par = {
          name: 'main_ask_answer',
          objClass: AskModel,
          params: {
            ordering: 'answer_amount-',
            page_size: 3
          },
          fetchFunction: AskService.getList
        };
        mainCtrl.askPaginator = new Paginator(par);
        mainCtrl.askPaginator.load();
        MainService.askPaginator = mainCtrl.askPaginator;
      } else {
        mainCtrl.askPaginator = MainService.askPaginator;
      }

      if(!MainService.topReviewers) {
        var par = {
          name: 'answer_leaders_list',
          objClass: AskModel,
          params: {
            type: 'week',
            page_size: 12
          },
          fetchFunction: AskService.getAnswerLeaderList
        };
        mainCtrl.topReviewers = new Paginator(par);
        mainCtrl.topReviewers.load();
        MainService.topReviewers = mainCtrl.topReviewers;
      } else {
        mainCtrl.topReviewers = MainService.topReviewers;
      }

      mainCtrl.sort = AskService.getSort();

      mainCtrl.selectedIndex = 0;
      mainCtrl.changeSort = function(sort) {
        switch(sort) {
          case 0 :
            mainCtrl.topReviewers.params.type = 'week';
            break;
          default :
            mainCtrl.topReviewers.params.type = null;
            break;
        }
        mainCtrl.topReviewers.clear();
        mainCtrl.topReviewers.load();
      };

      mainCtrl.addFollow = function (review) {
        if (!$rootScope.user.authRequired()) {
          return;
        }
        review.disabled = true;
        ExpertService.follow({id:review.getReviewer().id}).then(function(data) {
          angular.forEach($scope.reviewsFeaturedTop.items,function(e,i) {
            if(e.getReviewer().id == review.getReviewer().id ) {
              e.getReviewer().userprofile.current_user.follow = data.follow;
            }
          });
          angular.forEach($scope.reviewsFeatured.items,function(e,i) {
            if(e.applicant.reviewer.id  == review.applicant.reviewer.id ) {
              e.getReviewer().userprofile.current_user.follow = data.follow;
            }
          });
          review.disabled = false;
          review.getReviewer().userprofile.current_user.follow = data.follow;
        }, function() {

        });

      };

      var title = null;
      var description = null;
      var backgroundColor = 'background-bg-light';
      var shareImage = null;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

