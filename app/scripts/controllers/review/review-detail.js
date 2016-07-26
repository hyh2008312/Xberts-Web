'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl', ['$rootScope', '$scope', '$location', '$state', '$stateParams', 'review',
    'ShopifyService', 'AnalyticsService',
    function($rootScope, $scope, $location, $state, $stateParams, review,
             ShopifyService, AnalyticsService) {
      $scope.review = review;

      var project = review.project;
      var title = project.title;
      var description = project.description;
      var backgroundColor = 'background-whitem';
      var shareImage = review.banner;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

      //$scope.projectTypes = SystemData.getProjectTypes();

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false}
      ];

      $scope.commentsTabActive = false;
      $scope.applicationsTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.applicationsTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
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
