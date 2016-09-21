'use strict';

angular.module('xbertsApp')
  .directive('save', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      template: '<div>' +
      '<button class="btn btn-block text-uppercase" ng-class="{\'btn-danger\':join.vote,\'btn-primary\':!join.vote}"' +
      'ng-disabled="loadingJoin || voting " ng-click="save()"> ' +
      '<i class="fa {{icon}} fa-lg"></i> {{ title }} <span ng-show="interact.vote_amount>0">{{ interact.vote_amount }}<span>' +
      '</button>' +
      '</div>',
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
