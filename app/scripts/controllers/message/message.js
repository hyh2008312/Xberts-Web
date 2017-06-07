'use strict';

angular.module('xbertsApp')
  .controller('MessageCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.filterMessage = function (category) {
      var direction = 'incoming';
      var messageCategory = '';

      if (category === 'outgoing') {
        direction = 'outgoing';
      }

      $state.go('application.protected.message.inbox', {
        direction: direction,
        category: messageCategory
      })
    };

    $scope.showNotification = function() {
      $state.go('application.protected.message.notification');
    };
  }]);
