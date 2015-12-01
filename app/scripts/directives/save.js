'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:save
 * @description
 * # save
 */
angular.module('yeodjangoApp')
  .directive('save',['Interact','$rootScope', function (Interact,$rootScope) {
    return {
      template: '<div>' +
      '<button class="btn" ng-class="{ \'btn-primary\':joiner.vote , \'btn-success\':!joiner.vote }" ng-click="save()">' +
      '<i class="fa fa-heart fa-lg"></i>' +
      '</button>' +
      ' <span ng-bind="project.interact.vote_amount"></span> Interest</div>',
      scope:{
        interactId:'@'
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        console.log(scope.interactId);
        scope.join=Interact.Join({interact_id: scope.interactId,joiner_id:$rootScope.user.getUserId()});
        scope.join.get(function(results){
          scope.joiner=results[0];
          console.log(scope.joiner);
        });
        scope.save=function(){
        }
      }
    };
  }]);
