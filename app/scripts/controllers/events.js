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
        image: '/images/event-1.jpg',
        text: 'slide 1'
      },
      {
        image: '/images/event-2.jpg',
        text: 'slide 2'
      },
      {
        image: '/images/event-3.jpg',
        text: 'slide 1'
      },
      {
        image: '/images/event-4.jpg',
        text: 'slide 2'
      }
    ];
  }]);
