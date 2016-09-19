'use strict';

angular.module('xbertsApp')
  .directive('avatarImg', function () {
    return {
      restrict: 'E',
      scope: {
        avatarSrc: '=src',
        name: '=name',
        showName: '=showName'
      },
      templateUrl: 'views/directive/avatar.html'
    }
  })
  .directive('profileAvatar', function () {
    return {
      restrict: 'E',
      scope: {
        avatarSrc: '=src',
        name: '=name',
        showName: '=showName'
      },
      replace: true,
      templateUrl: 'views/directive/avatar_1.html',
      link: function postLink(scope, element, attrs) {
        scope.avatarSrc = scope.avatarSrc || 'https://xberts.imgix.net/static/icon/avatar_empty.gif?s=5b6b11a25bfa12e3a94966eb077ef16a';
      }
    }
  });
