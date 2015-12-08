'use strict';

angular.module('xbertsApp')
  .controller('LoginCtrl', ['$scope', '$location', 'AuthService', 'urlUtil',
    function($scope, $location, AuthService, urlUtil) {
    $scope.login = function() {
      if (!$scope.loginForm.$valid) {
        return;
      }
      $scope.$emit('backdropOn', 'post');

      // TODO: To make it work with django login redirect, need to extract potential next query param and pass it on
      // to auth request. Remove after implementing post-auth redirect in frontend.
      // ex. http://localhost:9000/?next=/projects/launch/#/login
      var paramRegex = /\?(.+\/)#/;
      var match = paramRegex.exec($location.absUrl());

      var params = {};
      if (match) {
        var paramStr = match[1];
        params = urlUtil.parseQueryParams(paramStr);
      }

      AuthService.login({username: $scope.username, password: $scope.password}, params).auth(
        function(value, responseHeaders) {
          AuthService.setUser(value);

          $scope.$emit('backdropOff', 'success');

          window.location.href = '/auth/home/';
        },
        function(httpResponse) {
          $scope.$emit('backdropOff', 'error');

          if (httpResponse.status === 401 || httpResponse.status === 403) {
            $scope.loginError = {invalidCredentials: true};
          } else {
            $scope.loginError = {generic: true};
          }
        });
    };
  }]);
