'use strict';

angular.module('xbertsApp')
  .controller('ShipAddressCtrl', ['$scope', 'SystemConstant', 'growl', '$rootScope', 'reviewer', 'applicant', '$state',
    'ReviewService', 'review', 'ShopifyService',
    function ($scope, SystemConstant, growl, $rootScope, reviewer, applicant, $state, ReviewService, review, ShopifyService) {
      //submit
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.profile = reviewer;
      $scope.review = review;
      $scope.COUNTRIES = SystemConstant.COUNTRIES;

      $scope.profileFormSubmit = function () {
        //project pre process
        $scope.profileForm.phoneError = !$scope.profile.phone_number;

        if ($scope.profileForm.$valid && !$scope.profileForm.phoneError) {
          var shouldPaySale = review.flashsale && review.flashsale.shopGatewayInventoryId !== '0' && !applicant.hasPaidSale;
          var shouldPayDeposit = review.deposit && review.deposit.shopGatewayInventoryId !== '0' && !applicant.hasPaidDeposit;
          var saleVariant;
          var depositVariant;

          $scope.$emit('backdropOn', 'post');

          $scope.profile.$put()
            .then(function (resp) {
              return ReviewService.confirmAddress(applicant.id);
            })
            .then(function () {
              if (shouldPaySale) {
                return ShopifyService.fetchProduct(review.flashsale.shopGatewayInventoryId)
                  .then(function (data) {
                    saleVariant = data.variants[0];
                  });
              }
            })
            .then(function () {
              if (shouldPayDeposit) {
                return ShopifyService.fetchProduct(review.deposit.shopGatewayInventoryId)
                  .then(function (data) {
                    depositVariant = data.variants[0];
                  });
              }
            })
            .then(function () {
              if ((shouldPaySale) || shouldPayDeposit) {
                return ShopifyService.buy(shouldPaySale ? review.flashsale.id : null,
                  shouldPaySale ? saleVariant : null,
                  shouldPaySale ? 1 : null,
                  shouldPayDeposit ? review.deposit.id : null,
                  shouldPayDeposit ? depositVariant : null,
                  $rootScope.user);
              }
            })
            .then(function() {
              if (shouldPaySale || shouldPayDeposit) {
                return;
              }

              $scope.$emit('backdropOff', 'success');
              growl.success('Thank you for confirming your shipping address. ' +
                'You will receive tracking information once the product is shipped.');

              $state.go('application.main', {reviewId: $scope.review.id});
            })
            .catch(function (resp) {
              growl.error('Sorry, some error happened.');
              $scope.$emit('backdropOff', 'error');
            });

          return false;
        } else {
          $scope.profileForm.submitted = true;
          $scope.profileForm.$invalid = true;
        }
      };
  }]);
