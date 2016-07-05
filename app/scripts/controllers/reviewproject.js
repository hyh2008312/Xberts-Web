'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewprojectCtrl
 * @description
 * # ReviewprojectCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewprojectCtrl', function ($rootScope, $scope, $location,$filter,$uibModal, review, Applicantsreview, reportPaginator) {
    $scope.review = review;
    $scope.reportPaginator = reportPaginator;
    $scope.applicantsSearch = {is_selected: true, is_exempted: false};

    var title = "We're now calling for reviewers to test-drive our new product:" + review.project.name;
    var description = review.project.description;
    var backgroundColor = 'background-whitem';
    var shareImage = review.project.image;
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

    $scope.applicant = {exist: false, is_selected: false, is_submit_report: false};

    if ($rootScope.user.isAuth()) {
      Applicantsreview.get({
        review_id: $scope.review.id,
        reviewer_id: $rootScope.user.getUserId()
      }, function (data) {
        if (data.count !== undefined && data.count > 0) {
          angular.extend($scope.applicant, data.results[0]);
          $scope.applicant.exist = true;
        }
      }, function () {

      })
    }

    $scope.tabs = [
      {title: 'detail', active: true},
      {title: 'comments', active: false},
      {title: 'reviews', active: false}
    ];

    $scope.commentsTabActive = false;
    $scope.reviewsTabActive = false;
    $scope.select = function (step) {
      $scope.commentsTabActive = false;
      $scope.reviewsTabActive = false;
      switch (step) {
        case 'comments':
          $scope.commentsTabActive = true;
          break;
        case 'reviews':
          $scope.reviewsTabActive = true;
          break;
      }
    };

    var search = $location.search();
    var tab = search.tab || 'detail';
    if (search.tab) {
      for (var i = 0; i < $scope.tabs.length; i++) {
        $scope.tabs[i].active = $scope.tabs[i].title === search.tab;
      }
    }

    $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === $scope.review.project.account.id;

    var sendMessage = function () {
      if (!$rootScope.user.authRequired()) {
        return;
      }

      var sendMessageModal = $uibModal.open({
        templateUrl: 'views/modal/send-message.html',
        windowClass: 'dialog-vertical-center',
        controller: 'SendMessageCtrl',
        resolve: {
          recipientId: function() {
            return $scope.review.project.account.id;
          }
        }
      });
    };

    $scope.contactUser = function () {
      sendMessage();
    };

  })
  .controller('ReviewProjectsCtrl', ['$scope', '$rootScope', 'SystemData', 'projectReviewPaginator','$state',
    function ($scope, $rootScope, SystemData, projectReviewPaginator,$state) {

      var title = 'Xberts - Crowdtesting';
      var description = 'Receive free samples of new products to test and review!Launch a Campaign';
      var backgroundColor = '';
      var shareImage = 'https://xberts.com/media/project/2016/03/11/3I9WcKxdVp.png';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);
      $scope.projectReviewPaginator = projectReviewPaginator;

      $scope.applyNow=function(id,$event){
        $state.go('application.protected.apply',{reviewId:id});
        console.log('aas');
      }
    }]);
