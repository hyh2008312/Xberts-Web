'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:auth
 * @description
 * # auth
 */
angular.module('yeodjangoApp')
  .directive('auth', ['Auth',function (Auth) {
    return {
      template: '<div style="display: none"></div>',
      restrict: 'E',
      replace:true,
      link: function postLink(scope, element, attrs) {
        Auth.setUser(attrs.userAuth,attrs.userId,attrs.userName,attrs.userType,attrs.userAvatar);
      }
    };
  }]);
