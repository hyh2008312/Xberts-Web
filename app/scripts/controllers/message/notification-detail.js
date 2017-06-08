'use strict';

angular.module('xbertsApp')
  .controller('MessageNotificationDetailCtrl', ['_', '$scope', '$rootScope', '$state', '$stateParams', 'message', 'MessageService',
    function (_, $scope, $rootScope, $state, $stateParams, message, MessageService) {
      $scope.message = message;

    }]);
