'use strict';

angular.module('xbertsApp')
.controller('ReportListCtrl', ['$scope', '$rootScope', 'reviewsFeaturedTop', 'MainService', 'MainModel','Paginator','ExpertService',
  function ($scope, $rootScope, reviewsFeaturedTop, MainService, MainModel,Paginator,ExpertService) {
    $scope.reviewsFeaturedTop = reviewsFeaturedTop;

    var par = {
      name: 'all_review_list',
      objClass:MainModel,
      params: {
        is_recommended:'False',
        edit_status:'PUBLISHED',
        approval_status:'APPROVED',
        page_size: 4
      },
      fetchFunction: MainService.getReviewsList
    };
    $scope.reviews = new Paginator(par);
    $scope.reviews.load();

    var par1 = {
      name: 'all_review_list_featured',
      objClass: MainModel,
      pageNumber: 3,
      params: {
        is_recommended:'True',
        edit_status:'PUBLISHED',
        approval_status:'APPROVED',
        page_size: 2
      },
      fetchFunction: MainService.getReviewsList
    };
    $scope.reviewsFeatured = new Paginator(par1);
    $scope.reviewsFeatured.load();

    $scope.loadNextImages = function() {
      $scope.reviews.loadNext().then(function() {
        $scope.reviewsFeatured.loadNext();
      });
    };

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

    var title = 'Articles – Inspirations from Savvy Shoppers';
    var description = 'Follow our savvy shoppers to get the best value for your money.';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
