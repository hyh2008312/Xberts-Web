'use strict';

angular.module('xbertsApp')
  .directive('backdrop', ['$rootScope', function ($rootScope) {
    return {
      template: '<div class="backdrop">' +
      '<div class="spin-large"><i class="fa fa-spinner fa-spin"></i></div> ' +
      '</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //element.addClass('backdrop');
        //element.height(window.screen.availHeight);
        //element.width(window.screen.availWidth);

        element.addClass('hide');
        $rootScope.backdropCount = 0;

        var decrementCount = function () {
          if ($rootScope.backdropCount > 0) {
            $rootScope.backdropCount--;
          }
        };

        $rootScope.$on('backdropOn', function (e, d) {
          $rootScope.backdropCount++;
          if ($rootScope.backdropCount > 0) {
            element.removeClass('hide');
          }
        });
        $rootScope.$on('backdropOff', function (e, d) {
          decrementCount();
          if ($rootScope.backdropCount < 1) {
            element.addClass('hide');
          }
        });
        $rootScope.$on('backdropInit', function (e, d) {
          $rootScope.backdropCount = 0;
          element.addClass('hide');
        });
        $rootScope.$on('$stateChangeStart', function (e, d) {
          $rootScope.backdropCount++;
          if ($rootScope.backdropCount > 0) {
            element.removeClass('hide');
          }
        });
        $rootScope.$on('$stateChangeSuccess', function (e, d) {
          decrementCount();
          if ($rootScope.backdropCount < 1) {
            element.addClass('hide');
          }
        });
        $rootScope.$on('$stateChangeError', function (e, d) {
          $rootScope.backdropCount = 0;
          element.addClass('hide');
        });
      }
    };
  }]);
