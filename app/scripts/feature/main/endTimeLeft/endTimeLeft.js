'use strict';

angular.module('xbertsApp')
  .directive('endTimeLeft', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        endTime: '=endTime',
        timeValue: '=?',
        timeUnit: '=?',
        extraInfo: '=?'
      },
      controller: ['$scope', '$element', 'moment', '$timeout', function ($scope, $element, moment, $timeout) {

        var endTime = moment($scope.endTime);
        var updateTime = function() {
          var now = moment();

          var leftDays = endTime.diff(now, 'days');
          var leftSeconds = endTime.diff(now, 'seconds') % 60;
          var leftMinutes = endTime.diff(now, 'minutes') % 60;
          var leftHours = endTime.diff(now, 'hours') % 24;

          $scope.timeValue = endTime.diff(now, 'seconds');
          $scope.timeUnit = (leftDays > 0 ? leftDays + ' days, ': '') +
            (leftHours > 0 ? (leftHours < 10 ? '0' + leftHours : leftHours) + ':': '00:') +
            (leftMinutes > 0 ? (leftMinutes < 10 ? '0' + leftMinutes : leftMinutes) + ':': '00:') +
            (leftSeconds > 0 ? (leftSeconds < 10 ? '0' + leftSeconds : leftSeconds): '00');

          $element.append($compile($element.contents())($scope));
          if($scope.timeValue > 0) {
            $timeout(function() {
              updateTime();
              $timeout.cancel();
            }, 1000);
          }
        };

        updateTime();
      }]
    };
  }]);
