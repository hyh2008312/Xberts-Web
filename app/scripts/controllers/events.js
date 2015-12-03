'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('EventsCtrl', ['$scope', 'EventNoDetail', 'eventPaginator', function ($scope, EventNoDetail, eventPaginator) {
    $scope.eventPaginator = eventPaginator;
    $scope.eventPaginator.watch($scope, 'eventPaginator.currentPage');

    $scope.slides = [
      {
        image: '/images/hero-domain-story.jpg',
        text: 'slide 1'
      },
      {
        image: '/images/hero-rogervoice-story.jpg',
        text: 'slide 2'
      }
    ];
  }]);
