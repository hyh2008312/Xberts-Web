'use strict';

angular.module('xbertsApp')
  .controller('EditProfileCtrl', ['$scope', '$rootScope', '$state', '$q', 'SystemConstant', 'userProfile',
    'UserProfileService', 'ExpertLoad', 'localStorageService', 'stages', 'Configuration',
    function ($scope, $rootScope, $state, $q, SystemConstant, userProfile,
              UserProfileService, ExpertLoad, localStorageService, stages, Configuration) {
      $scope.countryOptions = SystemConstant.COUNTRIES;
      $scope.stages = stages;
      $scope.userProfile = userProfile;

      $scope.data = {};

      $scope.data.currentAvatar = $rootScope.user.getUserAvatar();
      $scope.data.firstName = userProfile.firstName;
      $scope.data.lastName = userProfile.lastName;
      $scope.data.country = {code: userProfile.country};
      $scope.data.company = userProfile.company;
      $scope.data.position = userProfile.position;
      $scope.data.biography = userProfile.biography;
      $scope.data.expertiseList = _(userProfile.careerList).map(function(expertise) {
        return expertise.id;
      });

      $scope.checkExpertise = function(form) {
        if ($scope.data.expertiseList.length >= Configuration.userExpertiseMax) {
          form.expertiseError = {exceedLimit: true};
        } else {
          form.expertiseError = {};
        }
      };

      $scope.saveChange = function () {
        if (!$scope.editProfileForm.$valid) {
          return;
        }

        if ($scope.userProfile.careerList && $scope.userProfile.careerList.length > 0 &&
            $scope.data.expertiseList.length === 0) {
          $scope.editProfileForm.expertiseError = {required: true};

          return;
        }

        $scope.$emit('backdropOn', 'put');

        $scope.editProfileForm.serverError = {};

        var promises = [];

        if ($scope.data.avatar && $scope.data.avatar !== $rootScope.user.getUserAvatar()) {
          promises.push(UserProfileService.updateAvatar({
            avatar: $scope.data.avatar
          })
            .then(function(response) {
              $rootScope.user.setUserAvatar(response.data.avatar);
            }));
        }

        var userProfile = {
          firstName: $scope.data.firstName,
          lastName: $scope.data.lastName,
          country: $scope.data.country.code,
          company: $scope.data.company,
          position: $scope.data.position,
          biography: $scope.data.biography,
          careerList: $scope.data.expertiseList
        };

        promises.push(UserProfileService.updateProfile(userProfile)
          .then(function(value) {
            $rootScope.user.setFirstName(value.firstName);
            $rootScope.user.setLastName(value.lastName);
          }));

        $q.all(promises)
          .then(function(responses) {
            // Remove cached user profile
            localStorageService.clearAll();

            $scope.$emit('backdropOff', 'success');

            $state.go('application.expert', {expertId: $rootScope.user.getUserId()});
          })
          .catch(function(response) {
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
