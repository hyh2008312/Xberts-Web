'use strict';

angular.module('xbertsApp')
.controller('ArticlesListAdminCtrl', ['$scope', '$rootScope', 'ReviewService', 'MainModel','Paginator','Report',
  function ($scope, $rootScope, ReviewService, MainModel,Paginator,Report) {

    $scope.admin = $rootScope.user.isStaff()? true: false;

    $scope.categories = ReviewService.categoryAdmin;
    $scope.categoryId = null;

    $scope.changeCategory = function (index) {
      $scope.categoryId = index == 0? null: index;
      switch(index) {
        case 0:
          var par = {
            name: 'all_blog_list_pending',
            objClass: MainModel,
            params: {
              page_size: 8
            },
            fetchFunction: ReviewService.getBlogPending
          };
          $scope.reviews = new Paginator(par);
          $scope.reviews.load();
          break;
        case 1:
          var par = {
            name: 'all_reports_list_pending',
            objClass: Report,
            params: {
              page_size: 8
            },
            fetchFunction: ReviewService.getReviewPending
          };
          $scope.reports = new Paginator(par);
          $scope.reports.load();
          break;
        case 2:
          var par = {
            name: 'all_blog_list_skipped',
            objClass: MainModel,
            params: {
              page_size: 8
            },
            fetchFunction: ReviewService.getBlogSkipList
          };
          $scope.reviews = new Paginator(par);
          $scope.reviews.load();
          break;
        case 3:
          var par = {
            name: 'all_reports_list_skipped',
            objClass: Report,
            params: {
              page_size: 8
            },
            fetchFunction: ReviewService.getReviewSkipList
          };
          $scope.reports = new Paginator(par);
          $scope.reports.load();
          break;
        default:
          var par = {
            name: 'all_blog_list_pending',
            objClass: MainModel,
            params: {
              page_size: 8
            },
            fetchFunction: ReviewService.getBlogPending
          };
          $scope.reviews = new Paginator(par);
          $scope.reviews.load();
          break;
      }

    };

    $scope.changeCategory();

    var title = 'Articles – Inspirations from Savvy Shoppers';
    var description = 'Follow our savvy shoppers to get the best value for your money.';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
