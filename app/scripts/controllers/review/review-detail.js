'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl', ['$rootScope', '$timeout', '$scope', '$location', '$state', '$stateParams', '$uibModal', 'review',
    'ShopifyService', 'AnalyticsService', 'Applicantsreview', 'reportPaginator',
    function ($rootScope, $timeout, $scope, $location, $state, $stateParams, $uibModal, review,
              ShopifyService, AnalyticsService, Applicantsreview, reportPaginator) {
      $scope.review = review;
      $scope.reportPaginator = reportPaginator;

      if ($scope.review.reviewType == 'FREE_SAMPLE') {
        $scope.isShowReview = $scope.review.status == 'ENDED' && $scope.review.reportAmount > 0;
      } else {
        $scope.isShowReview = $scope.review.reportAmount > 0;
      }


      $scope.applicant = {exist: false, isSelected: false, isSubmitReport: false};

      $scope.applicantsSearch = {isSelected: true, isExempted: false};

      $scope.percentage = function () {
        if ($scope.review.flashsale) {
          var decimal = ($scope.review.flashsale.totalUnits - $scope.review.flashsale.availableUnits) / $scope.review.flashsale.totalUnits;
          return Math.round(decimal * 100);
        } else {
          return 0;
        }
      };

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


      var project = review.project;
      var title = review.title;
      var description = project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.project.mainImage;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'shipping', active: false},
        {title: 'comments', active: false},
        {title: 'reviews', active: false}
      ];
      $scope.tabActive = 0;

      var search = $location.search();
      var tab = search.tab || 'detail';
      switch (tab) {
        case 'detail':
          $scope.tabActive = 0;
          break;
        case 'shipping':
          $scope.tabActive = 1;
          break;
        case 'comments':
          $scope.tabActive = 2;
          break;
        case 'reviews':
          $scope.tabActive = 3;
          break;
        default:
          $scope.tabActive = 0;
      }
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
          case 'reviews':
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
              return $scope.review.project.account.id;
            }
          }
        });
      };

      $scope.contactUser = function () {
        sendMessage();
      };

      $scope.clearNoNum = function (obj, attr) {
        obj[attr] = obj[attr].replace(/[^\d]/g, "");
        obj[attr] = obj[attr].replace(/^0/g, "");
      };


      var buyProduct = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        $location.search('action', null);

        $scope.$emit('backdropOn', 'buy');

        ShopifyService.buy(review.flashsale.id, $scope.saleInfo.variant, $rootScope.user, $scope.saleInfo.quantity)
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
