'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('CommentCtrl', function ($scope) {
    $scope.$on("feedback",function(e,d){
      if(d==='comments'){
        $scope.getFeedbackPaginator();
      }
    })
  });
