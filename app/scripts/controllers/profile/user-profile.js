'use strict';

angular.module('xbertsApp')
  .controller('UserProfileCtrl', ['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    var mergedParams = angular.extend({expertId: $rootScope.user.getUserId()}, $stateParams);

    $state.go('application.expert',
      mergedParams,
      {location: 'replace'});
  }]);
