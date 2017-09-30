'use strict';

angular.module('xbertsApp')
  .controller('EmailUnsubscribeCtrl', ['$scope', '$rootScope','$stateParams','$mdDialog','EmailService',
    function ($scope, $rootScope,$stateParams,$mdDialog,EmailService) {

      $scope.email = $stateParams.email;

      $scope.h_id = $stateParams.h_id;

      $scope.page = 0;

      $scope.unsubscribe = function(ev) {
        var confirm = $mdDialog.confirm()
          .textContent('Are you sure you want to opt out from our Featured Articles?')
          .ariaLabel('Unsubscribe alert')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          $scope.page = 1;
          return;
          EmailService.unsubscribe({
            h_id: $scope.h_id,
            email: $scope.email
          }).then(function() {
            $scope.page = 1;
          });
        }, function() {});
      };


      var title = 'Xberts - Email unsubscribe';
      var description = 'Xberts is a Y Combinator funded company located in Silicon Valley and China. Our team is comprised of industry experts who are passionate about new technologies and creative designs.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
