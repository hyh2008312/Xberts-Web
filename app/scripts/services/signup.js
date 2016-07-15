'use strict';

angular.module('xbertsApp')
  .service('SignupService', ['$resource', '$location', 'Configuration', 'localStorageService', 'API_BASE_URL',
    function($resource, $location, Configuration, localStorageService, API_BASE_URL) {
      this.signup = function(firstName, lastName, email, password, country) {
        var params = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          country: country
        };

        if (localStorageService.cookie.isSupported &&
            localStorageService.cookie.get(Configuration.signupSourceStorageKey)) {
          params['source'] = localStorageService.cookie.get(Configuration.signupSourceStorageKey);
        }

        return $resource(API_BASE_URL + '/accounts/signup/').save(params).$promise;
      };

      this.saveSourceParam = function() {
        var source = '';

        // Check for param used for GA campaign first
        if ($location.search()['utm_source']) {
          source += $location.search()['utm_source'];
          if ($location.search()['utm_medium']) {
            source += '-' + $location.search()['utm_medium'];
          }
          if ($location.search()['utm_campaign']) {
            source += '-' + $location.search()['utm_campaign'];
          }
        } else if ($location.search()['source']) {
          source = $location.search()['source'];
        }

        if (source && localStorageService.cookie.isSupported) {
          localStorageService.cookie.set(Configuration.signupSourceStorageKey, source, 1);
        }
      };
  }]);
