'use strict';

angular.module('xbertsApp')
  .directive('backdrop', ['$rootScope', '$interval', function ($rootScope, $interval) {
    return {
      template: '<div class="xb-loading-top" layout="row" flex="noshrink">' +
      '<md-progress-linear md-mode="determinate" value="{{determinateValue}}"></md-progress-linear>' +
      '</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //element.addClass('backdrop');
        //element.height(window.screen.availHeight);
        //element.width(window.screen.availWidth);

        element.addClass('hide');
        $rootScope.backdropCount = 0;
        scope.determinateValue = 10;

        var interval = $interval(function() {
          scope.determinateValue += 2;
          if (scope.determinateValue > 100) clearInterval();
        }, 100, 0, true);

        var clearInterval = function() {
          $interval.cancel(interval);
          scope.determinateValue = 0;
          element.addClass('hide');
          interval = null;
        };

        var decrementCount = function () {
          if ($rootScope.backdropCount > 0) {
            $rootScope.backdropCount=100;
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
          if ($rootScope.backdropCount == 100) {
            element.addClass('hide');
            clearInterval();
          }
        });
        $rootScope.$on('backdropInit', function (e, d) {
          $rootScope.backdropCount = 0;
          element.addClass('hide');
          clearInterval();
        });
        $rootScope.$on('$stateChangeStart', function (e, d) {
          $rootScope.backdropCount++;
          if(interval == null) {
            interval = $interval(function() {
              scope.determinateValue += 2;
              if (scope.determinateValue > 100) clearInterval();
            }, 100, 0, true);
          }
          if ($rootScope.backdropCount > 0) {
            element.removeClass('hide');
          }
        });
        $rootScope.$on('$stateChangeSuccess', function (e, d) {
          decrementCount();
          if ($rootScope.backdropCount == 100) {
            element.addClass('hide');
            clearInterval();
          }
        });
        $rootScope.$on('$stateChangeError', function (e, d) {
          $rootScope.backdropCount = 100;
          element.addClass('hide');
          clearInterval();
        });
      }
    };
  }])
  .directive('firstPop', ['$rootScope', '$cookies', '$uibModal', function ($rootScope, $cookies, $uibModal) {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.addClass('backdrop');
        //element.height(window.screen.availHeight);
        //element.width(window.screen.availWidth);

        //element.addClass('hide');
        //$rootScope.backdropCount = 0;


        var pop = function () {
          var isFirst = $cookies.get('isFirst');
          if (isFirst) {
            return;
          }

          $cookies.put('isFirst', true);

          var sendMessageModal = $uibModal.open({
            templateUrl: 'views/modal/send-message.html',
            windowClass: 'dialog-vertical-center'
          });
        };

        pop();
      }
    };
  }])
  .directive('backToTop', [function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="xb-back-to-top">' +
      '<button class="btn btn-primary btn-sm"><i class="fa fa-arrow-up"></i> {{ text }}</button> ' +
      '</div>',
      scope: {
        text: "@buttonText",
        speed: "@scrollSpeed",
        theme: "@buttonTheme"
      },
      link: function (scope, element) {

        scope.text = scope.text || 'Scroll top';
        scope.speed = parseInt(scope.speed, 10) || 300;
        scope.theme = scope.theme || 'light';

        var self = this;

        scope.button = element.find('button');

        scope.button.on('click', function () {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          element.removeClass('show');
        });

        window.addEventListener('scroll', function () {
          if (window.pageYOffset > 0) {
            element.addClass('show');
          } else {
            element.removeClass('show');
          }
        });
      }
    };

  }]);
