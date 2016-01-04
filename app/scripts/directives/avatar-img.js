'use strict';

angular.module('xbertsApp')
  .directive('avatarImg', function() {
    return {
      restrict: 'E',
      scope: {
        avatarSrc: '=src',
        name: '=name',
        showName: '=showName'
      },
      templateUrl: 'views/directive/avatar.html'
    }
  });
