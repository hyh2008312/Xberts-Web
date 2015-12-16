'use strict';

angular.module('xbertsApp')
  .controller('EditProfileCtrl', ['$scope', '$rootScope', '$state', 'SystemConstant', 'userProfile',
    'UserProfileService', 'ExpertLoad',
    function($scope, $rootScope, $state, SystemConstant, userProfile, UserProfileService, ExpertLoad) {
      $scope.countryOptions = SystemConstant.COUNTRIES;

      $scope.data = {};

      $scope.data.currentAvatar = $rootScope.user.getUserAvatar();
      $scope.data.fullName = $rootScope.user.getUserName();
      $scope.data.country = {code: userProfile.country};
      $scope.data.company = userProfile.company;
      $scope.data.position = userProfile.position;
      $scope.data.biography = userProfile.biography;

      $scope.saveChange = function() {
        if (!$scope.editProfileForm.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'put');

        $scope.editProfileForm.serverError = {};

        var userProfile = {
          avatar: $scope.data.avatar,
          full_name: $scope.data.fullName,
          country: $scope.data.country.code,
          company: $scope.data.company,
          position: $scope.data.position,
          biography: $scope.data.biography
        }

        UserProfileService.updateProfile(userProfile, function(response) {
          $rootScope.user.setUserName(response.data.fullName);
          $rootScope.user.setUserAvatar(response.data.avatar);

          // Remove cached user profile
          ExpertLoad.delete($rootScope.user.getUserId());

          $scope.$emit('backdropOff', 'success');

          $state.go('application.expert', {expertId: $rootScope.user.getUserId()})
        }, function(response) {
          $scope.editProfileForm.serverError.generic = true;

          $scope.$emit('backdropOff', 'error');
        });
      };
  }]);
