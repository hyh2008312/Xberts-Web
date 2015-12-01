'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:join
 * @description
 * # join
 */
angular.module('yeodjangoApp')
  .directive('join', function () {
    return {
      template: '<div ng-transclude></div>',
      restrict: 'E',
      controller:function(){
        var joiners=[]
      }
    };
  });
