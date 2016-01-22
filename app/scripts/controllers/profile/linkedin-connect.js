'use strict';

angular.module('xbertsApp')
  .controller('LinkedinConnectCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$auth', 'AuthService', 'AccountService',
    function($scope, $rootScope, $state, $stateParams, $auth, AuthService, AccountService) {
      $scope.linkedinConnect = function() {
        $auth.authenticate('linkedin')
          .then(function(response) {
            $scope.$emit('backdropOn', 'post');

            return AccountService.linkedinConnect(response.data.access_token);
          })
          .then(function(value) {
            $rootScope.user.setLinkedinConnected(true);

            $scope.$emit('backdropOff', 'success');

            $state.reload();
          })
          .catch(function(response) {
            $scope.$emit('backdropOff', 'error');

            $scope.linkedinError.generic = true;
          });
      };
    }]);


