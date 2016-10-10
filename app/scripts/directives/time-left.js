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
  .directive('autoFixed', function () {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        element.on("affix.bs.affix",function(){
          $(this).css("width", element.width());
          $(this).css("left", element.offset().left);
        });
        element.on("affix-top.bs.affix",function(){
          $(this).css("width", '');
          $(this).css("left", '');
        })
      }
    };
  });
