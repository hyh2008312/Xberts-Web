angular.module('xbertsApp')
  .directive('editProfile', ['$rootScope','$state','localStorageService','UserProfileService', 'UploadAws','$q',function($rootScope, $state, localStorageService, UserProfileService, UploadAws,$q) {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        countryOptions: '='
      },
      templateUrl: 'scripts/feature/profile/editProfile/edit-profile.html',
      link: function (scope, element, attrs, ctrls) {
        scope.data = scope.data || [];

        var oldData = angular.copy(scope.data, {});

        scope.saveChange = function () {

          if (!scope.editProfileForm.$valid) {
            return;
          }
          scope.$emit('backdropOn', 'put');

          scope.editProfileForm.serverError = {};

          var promises = [];

          if (scope.data.avatar) {
            promises.push(UploadAws.uploadMedia(scope.data.avatar, 'IMAGE_USER_AVATAR')
              .then(function(response) {
                return UserProfileService.updateAvatar({
                  avatar: decodeURIComponent(response.headers('Location'))
                });
              })
              .then(function(response) {
                if(!scope.data.currentAvatar) {
                  scope.$emit('perksPointsOn', 2);
                }
                $rootScope.user.setUserAvatar(response.data.avatar);
              }));
          }

          var userProfile = {
            firstName: scope.data.firstName,
            lastName: scope.data.lastName,
            country: scope.data.country.code,
            company: scope.data.company,
            position: scope.data.position,
            biography: scope.data.biography
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

              scope.$emit('backdropOff', 'success');

              $state.go('application.expert', {expertId: $rootScope.user.getUserId()});
            })
            .catch(function(response) {
              scope.editProfileForm.serverError.generic = true;

              scope.$emit('backdropOff', 'error');
            });
        };
        scope.reset = function() {
          scope.data = angular.copy(oldData,{});
          scope.data.avatar = scope.currentAvatar;
        };
      }
    }
  }]);
