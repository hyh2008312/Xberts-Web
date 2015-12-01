'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:LaunchprojectCtrl
 * @description
 * # LaunchprojectCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
    .controller('LaunchprojectCtrl', ['$scope', '$rootScope','$stateParams',
    function ($scope, $rootScope,$stateParams) {
        $scope.projectId=$stateParams.projectId || null;
        $scope.redirect=false;
        $rootScope.bodyBackground = 'background-whitem';
        $scope.tabs = [
            {active:true,disable: false},
            {active:false,disable: true},
            {active:false,disable: true},
            {active:false,disable: true}
        ];
        $scope.$on('projectStep', function (e, d) {
            var step=Number(d);
            $scope.tabs[step+1].disable=false;
            $scope.tabs[step+1].active=true;
            if(step==2){
                $scope.redirect=true
            }
        });
        $scope.$on('projectId', function (e, d) {
            $scope.projectId=Number(d)
        });
        $scope.select=function(step){
            $scope.$broadcast('stepBroadcast',step);
        }
    }]);
