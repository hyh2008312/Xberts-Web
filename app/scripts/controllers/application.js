'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', 'AuthService',
    function($scope, $rootScope, $state, AuthService) {
      $scope.logout = function() {
        $rootScope.$emit('logout', true);
      };
    }]);

