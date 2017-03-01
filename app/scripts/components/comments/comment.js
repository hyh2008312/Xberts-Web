'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('CommentCtrl', function ($scope) {
    $scope.getFeedbackPaginator();
  });
