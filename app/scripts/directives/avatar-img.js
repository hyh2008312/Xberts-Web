'use strict';

angular.module('xbertsApp')
  .directive('avatarImg', function () {
    return {
      restrict: 'E',
      scope: {
        avatarSrc: '=src',
        name: '=name'
      },
      templateUrl: 'views/directive/avatar.html',
      link: function(scope) {
        scope.failWords = scope.name?scope.name.substr(0,1).toUpperCase():'';
        scope.avatarColor = 'c-user__bg-' + (Math.floor(Math.random() * 5) + 1);
      },
      controllerAs: 'avatarCtrl',
      controller: function ($scope) {
        this.setAvatarSrc = function(avatar) {
          return $scope.avatarSrc = avatar;
        }
      }
    }
  })
  .directive('fallAvatar', function () {
    return {
      restrict: 'A',
      require: '^^avatarImg',
      scope:{ },
      link: function (scope, element, attr, avatarCtrl) {
        // Listen for errors on the element and if there are any replace the source with the fallback source
        var errorHanlder = function () {
          element.off('error', errorHanlder);
          var newSrc = 'https://xberts.imgix.net/static/icon/6d74e0de-9256-4771-8fbb-eb35d16d30ed.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=4687cd3d4906c06ac11d8589fca25bed';
          if (element[0].src !== newSrc) {
            element[0].src = newSrc;
          }
          avatarCtrl.setAvatarSrc(false);
        };
        element.on('error', errorHanlder);
      }
    };
  })
  .directive('resizeAvatarName', function() {
    return {
      restrict: 'A',
      scope:{},
      link: function (scope, element, attr, avatarCtrl) {
        var base = element.innerWidth();
        element.css({
          fontSize: base * 0.75 + 'px',
          lineHeight: base + 'px'
        })
      }
    };
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
