'use strict';

angular.module('xbertsApp')
  .controller('SaleDetailController', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal',
    'growl', 'SystemData', 'Interact', 'sale', 'ShopifyService',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal,
              growl, SystemData, Interact, sale, ShopifyService) {
      var project=sale.project;
      var title = project.title;
      var description = project.description;
      var backgroundColor = 'background-whitem';
      var shareImage = project.image;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

      $scope.projectTypes = SystemData.getProjectTypes();

      $scope.sale = sale;

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

      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === $scope.sale.project.account.id;

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

      var buyProduct = function() {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        $location.search('action', null);

        $scope.$emit('backdropOn', 'buy');

        ShopifyService.buy(sale.inventoryId, $rootScope.user)
          .then(function() {
            $scope.$emit('backdropOff', 'buySuccess');
          })
          .catch(function() {
            $scope.$emit('backdropOff', 'buyFailed');
          });
      };

      $scope.buyClicked = function() {
        $state.go('application.buyDetail', {saleId: sale.id, action: 'buy'});

        buyProduct();
      };

      if ($stateParams.action === 'buy' && $rootScope.user.authRequired()) {
        buyProduct();
      }
    }]);
