'use strict';

angular.module('xbertsApp')
  .controller('AddressCtrl', ['$scope', '$rootScope', 'address', 'SystemConstant', 'AddressService','$stateParams','$state', '$mdDialog','$mdToast',
    function ($scope, $rootScope, address, SystemConstant, AddressService, $stateParams, $state, $mdDialog, $mdToast) {
      if($stateParams.giftId == null || $stateParams.giftPoints == null) {
        $state.go('application.main');
      }
      $scope.countryOptions = SystemConstant.COUNTRIES;
      $scope.address = address.length > 0 ? address[0]: {};

      $scope.submitForm = function(address, ev) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if($rootScope.user._points - $rootScope.user._consumed < $stateParams.giftPoints) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('.xb-body-view')))
              .clickOutsideToClose(true)
              .textContent("Oops! You don't have enough points to redeem this gift. Earn more points now!")
              .ariaLabel('Alert Dialog')
              .ok('ok')
              .targetEvent(ev)
          ).then(function() {
            $state.go('application.creditMain');
          }, function() {
            $state.go('application.creditMain');
          });
          return;
        }
        $scope.$emit('backdropOn', 'fetch project');
        if ($scope.address.id == null) {
          AddressService.create(address).then(function (data) {
            var params = {
              address_id: data.id,
              gift_id: $stateParams.giftId
            };
            AddressService.createOrder(params).then(function (data) {
              $scope.$emit('backdropOff', 'project get completed');
              $state.go('application.personalCredit', {id: $rootScope.user.getUserId()});
            }, function (data) {
              $scope.$emit('backdropOff', 'project get completed');
            });
          }, function () {
            $state.go('application.redeemDetail', {redeemId: $stateParams.giftId});
            $scope.$emit('backdropOff', 'project get completed');
          });
        } else {
          AddressService.update(address).then(function (data) {
            var params = {
              address_id: data.id,
              gift_id: $stateParams.giftId
            };
            AddressService.createOrder(params).then(function (data) {
              $scope.$emit('backdropOff', 'project get completed');
              $state.go('application.personalCredit', {id: $rootScope.user.getUserId()});
            }, function (data) {
              $scope.$emit('backdropOff', 'project get completed');
            });
          }, function () {
            $state.go('application.redeemDetail', {redeemId: $stateParams.giftId});
            $scope.$emit('backdropOff', 'project get completed');
          });
        }
      };

      $scope.submitMobileForm = function(address, ev) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if($rootScope.user._points - $rootScope.user._consumed < $stateParams.giftPoints) {
          $mdToast.show({
            hideDelay: 3000,
            position: 'bottom',
            controller: function(scope, $mdToast) {
              scope.cancel = function() {
                $mdToast.cancel();
              };
            },
            toastClass:'xb-redeem-detail__toast',
            templateUrl: 'scripts/feature/credit/redeemToast/redeem-toast.html'
          }).then(function() {
            $state.go('application.creditMain');
          }, function() {
            $state.go('application.creditMain');
          });
          return;
        }
        $scope.$emit('backdropOn', 'fetch project');
        if ($scope.address.id == null) {
          AddressService.create(address).then(function (data) {
            var params = {
              address_id: data.id,
              gift_id: $stateParams.giftId
            };
            AddressService.createOrder(params).then(function (data) {
              $scope.$emit('backdropOff', 'project get completed');
              $state.go('application.redeemDetail', {redeemId: $rootScope.user.getUserId()});
            }, function () {
              $state.go('application.error');
              $scope.$emit('backdropOff', 'project get completed');
            });
          }, function () {
            $state.go('application.redeemDetail', {redeemId: $stateParams.giftId});
            $state.go('application.error');
            $scope.$emit('backdropOff', 'project get completed');
          });
        } else {
          AddressService.update(address).then(function (data) {
            var params = {
              address_id: data.id,
              gift_id: $stateParams.giftId
            };
            AddressService.createOrder(params).then(function (data) {
              $scope.$emit('backdropOff', 'project get completed');
              $state.go('application.redeemDetail', {redeemId: $rootScope.user.getUserId()});
            }, function () {
              $scope.$emit('backdropOff', 'project get completed');
              $state.go('application.error');
            });
          }, function () {
            $scope.$emit('backdropOff', 'project get completed');
            $state.go('application.error');
          });
        }
      };

      var title = 'Address Xberts';
      var description = 'Xberts is a Y Combinator funded company located in Silicon Valley and China. Our team is comprised of industry experts who are passionate about new technologies and creative designs.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
