'use strict';

angular.module('xbertsApp')
  .controller('ReportReminderCtrl', ['$rootScope', '$scope', '$uibModalInstance', '$state',
    function($rootScope, $scope, $uibModalInstance, $state) {
      $scope.submitReview = function() {
        $uibModalInstance.dismiss();

        $state.go('application.expert', {expertId: $rootScope.user.getUserId(), tab: 'trials'});
      };
    }]);
