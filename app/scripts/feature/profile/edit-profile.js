'use strict';

angular.module('xbertsApp')
  .controller('EditProfileCtrl', ['$scope', '$rootScope', '$state', '$q', 'SystemConstant', 'userProfile',
    'UserProfileService', 'localStorageService', 'stages', '$location',
    function ($scope, $rootScope, $state, $q, SystemConstant, userProfile,
              UserProfileService, localStorageService, stages, $location) {
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
      $scope.data.gender = userProfile.gender;

      $scope.selectedIndex = 0;

      var tabIndexToParam = ['profile', 'social', 'setting'];

      var updateActiveTabOnSearch = function () {
        var tab = $location.search().tab;
        $scope.selectedIndex = parseInt(tabIndexToParam.findIndex(function(x) {
          return x == tab;
        }));
      };

      updateActiveTabOnSearch();

      $scope.$on('$locationChangeSuccess', function () {
        updateActiveTabOnSearch();
      });

      $scope.load = function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $location.search('tab', tabIndexToParam[$scope.selectedIndex]);
          });
        }, 0);
      };

      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
