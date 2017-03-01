'use strict';

angular.module('xbertsApp')
  .directive('save', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      template: '<md-icon ng-class="{\'md-warn\':join.vote}"' +
      'ng-disabled="loadingJoin || voting " ng-click="save()">' +
      'thumb_up'+
      '</md-icon>',
      require: '^join',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs, joinController) {
        scope.title = attrs.title || 'Like';
        scope.icon = attrs.icon || '';
        scope.save = function () {
          //todo:增加登录权限
          if (scope.join.id === undefined) {
            joinController.participate(true);
          }
          else {
            joinController.participate(!scope.join.vote)
          }
        }
      }
    };
  }]);
