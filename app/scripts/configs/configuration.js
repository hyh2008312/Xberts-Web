'use strict';

angular.module('xbertsApp')
  .provider('Configuration', ['defaultConfiguration',
    function (defaultConfiguration) {
      angular.extend(this, defaultConfiguration);
      this.$get = function() {
        return defaultConfiguration;
      };
  }]);
