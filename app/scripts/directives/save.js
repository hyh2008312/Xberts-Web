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
      templateUrl:'/views/save.html',
      require: '^join',
      restrict: 'E',
      link: function postLink(scope, element, attrs, joinController) {
        scope.save = function () {
          //todo:增加登录权限
          if(scope.join.id===undefined){
            joinController.participate(true);
          }
          else {
            joinController.participate(!scope.join.vote)
          }
        }
      }
    };
  }]);
