'use strict';

angular.module('xbertsApp')
  .directive('save', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      template: '<div>' +
      '<md-button class="md-raised xb-btn-block" ng-class="{\'md-warn\':join.vote,\'md-primary\':!join.vote}"' +
      'ng-disabled="loadingJoin || voting " ng-click="save()"> ' +
      '<i class="fa {{icon}} fa-lg"></i> {{ title }} <span ng-show="interact.vote_amount>0">{{ interact.vote_amount }}<span>' +
      '</md-button>' +
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
