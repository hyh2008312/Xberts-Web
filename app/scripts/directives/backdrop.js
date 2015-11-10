'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:backdrop
 * @description
 * # backdrop
 */
angular.module('yeodjangoApp')
  .directive('backdrop', ['$rootScope', function ($rootScope) {
    return {
      template: '<div class="backdrop">' +
      '<div class="spin-large"><i class="fa fa-spinner fa-spin"></i></div> ' +
      '</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //element.addClass('backdrop');
        element.height(window.screen.availHeight);
        element.width(window.screen.availWidth);
        element.addClass('hide');
        $rootScope.backdropCount = 0;
        $rootScope.$on('backdropOn', function (e, d) {
          $rootScope.backdropCount++;
          if ($rootScope.backdropCount > 0) {
            element.removeClass('hide');
          }
        });
        $rootScope.$on('backdropOff', function (e, d) {
          $rootScope.backdropCount--;
          if ($rootScope.backdropCount < 1) {
            element.addClass('hide');
          }
        });
        $rootScope.$on('$stateChangeStart', function (e, d) {
          $rootScope.backdropCount++;
          if ($rootScope.backdropCount > 0) {
            element.removeClass('hide');
          }
        });
        $rootScope.$on('$stateChangeSuccess', function (e, d) {
          $rootScope.backdropCount--;
          if ($rootScope.backdropCount < 1) {
            element.addClass('hide');
          }
        });
      }
    };
  }]);
