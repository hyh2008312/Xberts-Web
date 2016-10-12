'use strict';

angular.module('xbertsApp')
  .directive('timeLeft', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        endTime: '=endTime',
        timeValue: '=?',
        timeUnit: '=?',
        extraInfo: '=?'
      },
      controller: ['$scope', '$element', 'moment', function ($scope, $element, moment) {
        var now = moment();
        var endTime = moment($scope.endTime);

        if (endTime.diff(now, 'days') > 1) {
          $scope.timeValue = endTime.diff(now, 'days');
          $scope.timeUnit = 'days';
        } else if (endTime.diff(now, 'days') === 1) {
          $scope.timeValue = 1;
          $scope.timeUnit = 'day';
        } else if (endTime.diff(now, 'hours') > 1) {
          $scope.timeValue = endTime.diff(now, 'hours');
          $scope.timeUnit = 'hours';
        } else if (endTime.diff(now, 'hours') === 1) {
          $scope.timeValue = 1;
          $scope.timeUnit = 'hour';
        } else if (endTime.diff(now, 'minutes') > 1) {
          $scope.timeValue = endTime.diff(now, 'minutes');
          $scope.timeUnit = 'minutes';
        } else if (endTime.diff(now, 'minutes') === 1) {
          $scope.timeValue = 1;
          $scope.timeUnit = 'minute';
        } else if (endTime.diff(now, 'seconds') > 1) {
          $scope.timeValue = endTime.diff(now, 'seconds');
          $scope.timeUnit = 'seconds';
        } else if (endTime.diff(now, 'seconds') === 1) {
          $scope.timeValue = 1;
          $scope.timeUnit = 'second';
        } else {
          $scope.timeValue = 0;
          $scope.timeUnit = 'second';
        }

        $element.append($compile($element.contents())($scope));
      }]
    };
  }])
  .directive('autoFixed', ['$timeout','$window', function ($timeout,$window) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        element.on("affix.bs.affix", function () {
          $(this).css("width", element.parent().innerWidth() * 0.33333);
          $(this).css("left", element.parent().innerWidth() * 0.66666 + element.parent().offset().left);
        });
        element.on("affix-top.bs.affix", function () {
          $(this).css("width", '');
          $(this).css("left", '');
        });

        function applyAffix() {
          $timeout(function () {
            element.affix({
              offset: {
                top: element.offset().top - 20
              }
            });
          });
        }

        function resize() {
          if(element.hasClass('affix')){
            element.css("width", element.parent().innerWidth() * 0.33333);
            element.css("left", element.parent().innerWidth() * 0.66666 + element.parent().offset().left);
          }
        }

        //$rootScope.$on('$stateChangeSuccess', function() {
        //  $element.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
        //  applyAffix();
        //});

        angular.element($window).bind('resize', resize);

        applyAffix();
      }
    };
  }]);
