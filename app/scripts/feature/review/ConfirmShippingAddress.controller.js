'use strict';

angular.module('xbertsApp')
  .controller('ConfirmShippingAddressCtrl', ['$scope', 'SystemConstant', 'growl', '$rootScope', 'review', 'applier', 'application', '$state',
    'ReviewService', 'ShopifyService','$q',
    function ($scope, SystemConstant, growl, $rootScope, review, applier, application, $state, ReviewService, ShopifyService,$q) {
      var self = this;
      $rootScope.pageSettings.setBackgroundColor('background-whitem');

      self.applier = applier;
      self.review = review;
      self.application = application;
      self.countries = SystemConstant.COUNTRIES;

      self.isPaidTrial = ReviewService.isPaidTrial;

      self.applierFormSubmit = function (applierForm) {
        if (applierForm.$valid) {
          // identification for applier confirm address
          self.applier.appid = self.application.id;
          $scope.$emit('backdropOn', 'confirm start');
          ReviewService
            .saveApplier(self.applier)
            .then(
              function () {
                $scope.$emit('backdropOff', 'confirm success');
              },
              function () {
                growl.error('Sorry,some error happened.');
                $scope.$emit('backdropOff', 'confirm error');
              }
            )
        }
      };

      self.pay = function () {
        var shouldPaySale = self.review.flashsale && self.review.flashsale.shopGatewayInventoryId !== '0' && !self.application.hasPaidSale;
        var shouldPayDeposit = self.review.deposit && self.review.deposit.shopGatewayInventoryId !== '0' && !self.application.hasPaidDeposit;
        var saleVariant;
        var depositVariant;

        $scope.$emit('backdropOn', 'pay start');

        var promises = [];

        if (shouldPaySale) {
          promises.push(
            ShopifyService
              .fetchProduct(review.flashsale.shopGatewayInventoryId)
              .then(function (data) {
                saleVariant = data.variants[0];
              })
          )
        }
        if (shouldPayDeposit) {
          promises.push(
            ShopifyService
              .fetchProduct(review.deposit.shopGatewayInventoryId)
              .then(function (data) {
                depositVariant = data.variants[0];
              })
          );
        }

        $q.all(promises)
          .then(function () {
            ShopifyService.buy(shouldPaySale ? review.flashsale.id : null,
              shouldPaySale ? saleVariant : null,
              shouldPaySale ? 1 : null,
              shouldPayDeposit ? review.deposit.id : null,
              shouldPayDeposit ? depositVariant : null,
              $rootScope.user);
          })
          .catch(function () {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'pay error');
          });
      };
    }]);
