'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:Redirect
 * @description
 * # Redirect
 */
angular.module('xbertsApp')
    .directive('redirect', ['$window','$timeout','$interval',function ($window, $timeout, $interval) {
        return {
            template: '<span></span>',
            restrict: 'E',
            replace: true,
            scope: {
                href: '@',
                redirected: '@'
            },
            link: function postLink(scope, element) {
                var t = 2;
                element.text(t + "s");
                var redirect = function () {
                    if (scope.redirected === 'false') return;
                    $timeout(function () {
                        $window.location = scope.href;
                    }, (t+1) * 1000);
                    $interval(function () {
                        element.text(t + "s");
                        t = t - 1;
                    }, 500, t);
                };
                scope.$watch('redirected', redirect);

            }
        };
    }]);
