'use strict';

angular.module('xbertsApp')
  .controller('MessageInboxCtrl', ['_', '$scope', '$state', '$stateParams', 'messages','$mdMedia',
    function(_, $scope, $state, $stateParams, messages,$mdMedia) {
      $scope.messages = messages;

      $scope.$parent.category = 'incoming';

      $scope.$watch(function() { return $mdMedia('xs'); }, function(data) {
        $scope.screenIsSmall = data;
      });

  }]);
