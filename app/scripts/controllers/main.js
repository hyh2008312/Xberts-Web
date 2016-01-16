'use strict';

angular.module('xbertsApp')
  .controller('MainCtrl', ['$scope', '$state', 'modalWrap', 'projectPaginator', 'eventPaginator', 'expertPaginator',
    function ($scope, $state, modalWrap, projectPaginator, eventPaginator, expertPaginator) {
      $scope.eventPaginator = eventPaginator;
      $scope.projectPaginator = projectPaginator;
      $scope.expertPaginator = expertPaginator;
      $scope.slides = [
        {
          image: '/images/landing_1_1.jpg',
          text: 'Connect smart hardware innovators with distributors,<br/>retailers and sales agent partners around the world',
          buttonText:'Get Started',
          buttonColor:'btn-primary',
          url: 'application.signup'
        }
      ];
    }]);
