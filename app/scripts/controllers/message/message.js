'use strict';

angular.module('xbertsApp')
  .controller('MessageCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.filterMessage = function () {
      $state.go('application.protected.message.inbox')
    };

    $scope.showNotification = function() {
      $state.go('application.protected.message.notification');
    };
  }]);
