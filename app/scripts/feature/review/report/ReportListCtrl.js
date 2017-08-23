'use strict';

angular.module('xbertsApp')
.controller('ReportListCtrl', ['$scope', '$rootScope', 'reviewsFeaturedTop', 'ReviewService', 'MainModel','Paginator',
  'ExpertService','$state',
  function ($scope, $rootScope, reviewsFeaturedTop, ReviewService, MainModel,Paginator,ExpertService,$state) {
    $scope.reviewsFeaturedTop = reviewsFeaturedTop;

    if(reviewsFeaturedTop.count > 4) {
      if(!ReviewService.reviews) {
        var par = {
          name: 'all_review_list',
          objClass: MainModel,
          params: {
            edit_status:'PUBLISHED',
            approval_status:'APPROVED',
            page_size: 12
          },
          fetchFunction: ReviewService.getArticleList
        };
        $scope.reviews = new Paginator(par);
        $scope.reviews.load();
        ReviewService.reviews = $scope.reviews;
      } else {
        $scope.reviews = ReviewService.reviews;
      }
    }

    $scope.addFollow = function (review) {
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

    $scope.addArticles = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.reviewReport');
    };

    var title = 'Articles – Inspirations from Savvy Shoppers';
    var description = 'Follow our savvy shoppers to get the best value for your money.';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
