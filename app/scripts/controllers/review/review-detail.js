'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl', ['$rootScope', '$scope', '$location', '$state', '$stateParams', 'review',
    'ShopifyService', 'AnalyticsService',
    function($rootScope, $scope, $location, $state, $stateParams, review,
             ShopifyService, AnalyticsService) {
      $scope.review = review;

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
