'use strict';

angular.module('xbertsApp')
  .controller('TrialDetailController', ['$rootScope', '$timeout', '$scope', '$location', '$state', '$stateParams', '$uibModal', 'review',
    'ShopifyService', 'AnalyticsService',
    function ($rootScope, $timeout, $scope, $location, $state, $stateParams, $uibModal, review,
              ShopifyService, AnalyticsService) {
      var self = this;

      $scope.review = review;

      self.isPaidTrial = function(review){
        var isPaid = false;
        if(review.flashsale){
          isPaid = Number(review.flashsale.salePrice.amount) > 0;
        }
        return isPaid
      };

      self.offPercentage = function (review) {
        if (review.flashsale) {
          var retailPrice = review.project.retailPrice.amount;
          var salePrice  = review.flashsale.salePrice.amount;
          var decimal = (retailPrice - salePrice) / retailPrice;
          return Math.round(decimal * 100);
        } else {
          return 0;
        }
      };

      $scope.percentage = function () {
        if ($scope.review.flashsale) {
          var decimal = ($scope.review.flashsale.totalUnits - $scope.review.flashsale.availableUnits) / $scope.review.flashsale.totalUnits;
          return Math.round(decimal * 100);
        } else {
          return 0;
        }
      };

      $scope.saleInfo = {
        variant: null,
        quantity: '1',
        productVariants: [],
        reload: true,
        options: 'Options'
      };
      if (review.flashsale != null && review.flashsale.shopGatewayInventoryId != null) {
        ShopifyService.fetchProduct(review.flashsale.shopGatewayInventoryId).then(function (data) {
          angular.copy(data.variants, $scope.saleInfo.productVariants);
          $scope.saleInfo.variant = $scope.saleInfo.productVariants[0];
          $scope.saleInfo.reload = false;
          var options = [];
          for (var i = 0; i < $scope.saleInfo.variant.optionValues.length; i++) {
            options.push($scope.saleInfo.variant.optionValues[i].name);
          }
          $scope.saleInfo.options = options.join(' / ');
          $timeout(function () {
            $scope.saleInfo.reload = true;
          }, 0);
        });
      }

      $scope.depositInfo = {
        variant: null
      };
      if (review.deposit && review.deposit.shopGatewayInventoryId) {
        ShopifyService.fetchProduct(review.deposit.shopGatewayInventoryId).then(function (data) {
          $scope.depositInfo.variant = data.variants[0];
        });
      }

      var project = review.project;
      var title = review.title;
      var description = project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.project.mainImage;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === $scope.review.project.account.id;

      var buyProduct = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        $location.search('action', null);

        $scope.$emit('backdropOn', 'buy');

        ShopifyService.buy(review.flashsale.id,
          $scope.saleInfo.variant,
          $scope.saleInfo.quantity,
          review.deposit ? review.deposit.id : null,
          $scope.depositInfo.variant,
          $rootScope.user)
          .then(function () {
            AnalyticsService.sendPageView($location.path() + '/buy', null, $scope.review.project.categories[0].name);

            // Show spinner until purchase flow redirect
          })
          .catch(function () {
            $scope.$emit('backdropOff', 'buyFailed');
          });
      };

      $scope.buyClicked = function () {
        $state.go('application.salecampaign', {reviewId: review.id, action: 'buy'});

        buyProduct();
      };

      $scope.applyNow = function() {
        if ($rootScope.user.hasRole('bad_reviewer')) {
          var reportReminderModal = $uibModal.open({
            templateUrl: 'views/modal/report-reminder.html',
            windowClass: 'dialog-vertical-center',
            controller: 'ReportReminderCtrl'
          });
        } else {
          $state.go('application.protected.apply', {reviewId: review.id});
        }
      };

      if ($stateParams.action === 'buy' && $rootScope.user.authRequired()) {
        buyProduct();
      }

      // Send project category to GA
      if (dataLayer) {
        dataLayer.push({
          projectCategory: $scope.review.project.categories[0].name
        });
      }
    }]);
