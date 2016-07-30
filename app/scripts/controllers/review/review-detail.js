'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl', ['$rootScope', '$scope', '$location', '$state', '$stateParams', 'review',
    'ShopifyService', 'AnalyticsService','Applicantsreview',
    function($rootScope, $scope, $location, $state, $stateParams, review,
             ShopifyService, AnalyticsService,Applicantsreview) {
      $scope.review = review;

      $scope.applicant = {exist: false, isSelected: false, isSubmitReport: false};

      $scope.applicantsSearch = {isSelected: true, isExempted: false};

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

      var project = review.project;
      var title = project.title;
      var description = project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.banner;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

      //$scope.projectTypes = SystemData.getProjectTypes();

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false},
        {title: 'reviewers', active: false}
      ];

      $scope.commentsTabActive = false;
      $scope.reviewersTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.reviewersTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
            $scope.reviewersTabActive = false;
            break;
          case 'reviewers':
            $scope.commentsTabActive = false;
            $scope.reviewersTabActive = true;
            break;
        }
      };

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
            recipientId: function () {
              return $scope.sale.project.account.id;
            }
          }
        });
      };

      $scope.contactUser = function () {
        sendMessage();
      };


      var buyProduct = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        $location.search('action', null);

        $scope.$emit('backdropOn', 'buy');

        ShopifyService.buy(review.flashsale.id, review.flashsale.shopGatewayInventoryId, $rootScope.user, 1)
          .then(function () {
            AnalyticsService.sendPageView($location.path() + '/buy');

            // Show spinner until purchase flow redirect
          })
          .catch(function () {
            $scope.$emit('backdropOff', 'buyFailed');
          });
      };

      $scope.buyClicked = function () {
        $state.go('application.campaign', {reviewId: review.id, action: 'buy'});

        buyProduct();
      };

      if ($stateParams.action === 'buy' && $rootScope.user.authRequired()) {
        buyProduct();
      }


  }]);
