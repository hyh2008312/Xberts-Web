'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('EventsCtrl', ['$scope', 'eventPartnerPaginator', 'eventPaginator',
    function ($scope, eventPartnerPaginator, eventPaginator) {
      $scope.eventPaginator = eventPaginator;
      $scope.eventPartnerPaginator = eventPartnerPaginator;
      $scope.eventPaginator.watch($scope, 'eventPaginator.currentPage');

      $scope.slides = [
        {
          image: '/images/event_5.jpg',
          text: 'Xberts introduced Nut to global distribution partners at CES&nbsp;2016'
        },
        {
          image: '/images/event_4.jpg',
          text: 'Buyers stopped by Xberts booth to check out OneAdaptrStack at CES&nbsp;2016'
        },
        {
          image: '/images/event_1.jpg',
          text: 'Xberts partnered with 360Fashion Network to present an epic smart fashion expo in San Francisco'
        },

        {
          image: '/images/event_3.jpg',
          text: 'GLXSS team presented their products to buyers on Xberts booth'
        },
        {
          image: '/images/event_2.jpg',
          text: 'Xberts team co-hosted the largest innovation and entrepreneurship forum - SVIEF&nbsp;2015'
        }
      ];
    }]);
