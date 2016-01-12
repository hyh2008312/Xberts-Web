'use strict';

angular.module('xbertsApp')
  .controller('EditProfileCtrl', ['$scope', '$rootScope', '$state', 'SystemConstant', 'userProfile',
    'UserProfileService', 'ExpertLoad',
    function($scope, $rootScope, $state, SystemConstant, userProfile, UserProfileService, ExpertLoad) {
      $scope.countryOptions = SystemConstant.COUNTRIES;

      $scope.data = {};

      $scope.data.currentAvatar = $rootScope.user.getUserAvatar();
      $scope.data.firstName = userProfile.firstName;
      $scope.data.lastName = userProfile.lastName;
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
          first_name: $scope.data.firstName,
          last_name: $scope.data.lastName,
          country: $scope.data.country.code,
          company: $scope.data.company,
          position: $scope.data.position,
          biography: $scope.data.biography
        };

        UserProfileService.updateProfile(userProfile, function(response) {
          // TDOD: Update user model to derive full name from first name and last name
          $rootScope.user.setUserName(getFullName(response.data.firstName, response.data.lastName));
          $rootScope.user.setUserAvatar(response.data.avatar);

          // Remove cached user profile
          ExpertLoad.delete($rootScope.user.getUserId());

          $scope.$emit('backdropOff', 'success');

          $state.go('application.expert', {expertId: $rootScope.user.getUserId()});
        }, function(response) {
          $scope.editProfileForm.serverError.generic = true;

          $scope.$emit('backdropOff', 'error');
        });
      };

      function getFullName(firstName, lastName) {
        var fullName = '';

        if (firstName) {
          fullName = firstName;

          if (lastName) {
            fullName = fullName + ' ' + lastName;
          }
        }

        return fullName;
      }
  }]);
