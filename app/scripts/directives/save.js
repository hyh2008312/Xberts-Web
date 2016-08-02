'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:save
 * @description
 * # save
 */
angular.module('xbertsApp')
  .directive('save', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      template: '<div>' +
      '<button class="button button-glow" ng-class="{\'button-caution\':join.vote,\'button-primary\':!join.vote}"' +
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
  }])
  .directive('follow', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      template: '<button class="btn" ng-class="{ \'btn-gray\':join.vote,\'btn-success\':!join.vote }"' +
      'ng-disabled="loadingJoin || voting " ng-click="save()" ng-switch="join.vote"> ' +
      '<span ng-switch-when="true">Unfollow</span> ' +
      '<span ng-switch-when="false">Follow</span> ' +
      '</button>',
      require: '^join',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs, joinController) {
        if (attrs.width) {
          element.css("width", attrs.width);
        }
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
  }])
;
