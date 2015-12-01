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
      template: '<div>' +
      '<button class="btn" ng-class="{ \'btn-primary\':joiner.vote , \'btn-success\':!joiner.vote }" ng-click="save()">' +
      '<i class="fa fa-heart fa-lg"></i>' +
      '</button>' +
      ' <span ng-bind="project.interact.vote_amount"></span> Interest</div>',
      scope:{},
      require: '^join',
      restrict: 'E',
      link: function postLink(scope, element, attrs, joinController) {
        scope.save = function () {
          if(scope.join===undefined){
            joinController.participate(true);
          }
          else {
            joinController.participate(!scope.join.joiner.vote)
          }
        }
      }
    };
  }]);
