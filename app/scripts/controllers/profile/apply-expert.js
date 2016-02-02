'use strict';

angular.module('xbertsApp')
  .controller('ApplyExpertCtrl', ['$scope', '_', 'localStorageService', 'UserProfileService', 'AccountService',
    'stages', 'Configuration', 'SystemConstant',
    function($scope, _, localStorageService, UserProfileService, AccountService,
             stages, Configuration, SystemConstant) {
      $scope.stages = stages;
      $scope.data = {};

      $scope.data.expertiseList = _($scope.expert.career_list).map(function(expertise) {
        return expertise.id;
      });

      $scope.checkExpertise = function(form) {
        if ($scope.data.expertiseList.length >= Configuration.userExpertiseMax) {
          form.expertiseError = {exceedLimit: true};
        } else {
          form.expertiseError = {};
        }
      };

      $scope.applyExpert = function(form) {
        form.serverError = {};

        if ($scope.data.expertiseList.length === 0) {
          form.expertiseError = {required: true};

          return;
        }

        UserProfileService.updateProfile({
          careerList: $scope.data.expertiseList
        })
          .then(function(value) {
            return AccountService.requestRole(SystemConstant.ROLES.DOMAIN_EXPERT);
          })
          .then(function(value) {
            localStorageService.clearAll();

            $scope.$close();
          })
          .catch(function(response) {
            form.serverError = {generic: true};
          });
      };
  }]);
