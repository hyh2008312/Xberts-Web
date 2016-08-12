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
      transclude: true,
      replace: true,
      template: '<div id="backtop" class="{{theme}}">' +
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

        scope.currentYPosition = function () {
          if (self.pageYOffset)
            return self.pageYOffset;
          if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
          if (document.body.scrollTop)
            return document.body.scrollTop;
          return 0;
        };

        scope.smoothScroll = function () {
          var startY = scope.currentYPosition();
          var stopY = 0;
          var distance = stopY > startY ? stopY - startY : startY - stopY;
          if (distance < 100) {
            scrollTo(0, stopY);
            return;
          }
          var speed = Math.round(scope.speed / 100);
          var step = Math.round(distance / 25);
          var leapY = stopY > startY ? startY + step : startY - step;
          var timer = 0;
          if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
              setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
              leapY += step;
              if (leapY > stopY) leapY = stopY;
              timer++;
            }
            return;
          }
          for (var j = startY; j > stopY; j -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
          }
        };

        scope.button = element.find('button');

        scope.button.on('click', function () {
          scope.smoothScroll();
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
