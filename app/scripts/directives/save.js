'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:save
 * @description
 * # save
 */
angular.module('yeodjangoApp')
  .directive('save', ['Interact', '$rootScope', function (Interact, $rootScope) {
    return {
      template: '<button class="btn" ng-class="{\'btn-danger\':join.vote,\'btn-gray\':!join.vote}"' +
      'ng-disabled="loadingJoin || voting " ng-click="save()"> ' +
      '<i class="fa fa-heart fa-lg"></i> LIKE' +
      '</button>',
      require: '^join',
      restrict: 'E',
      link: function postLink(scope, element, attrs, joinController) {
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
      link: function postLink(scope, element, attrs, joinController) {
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
