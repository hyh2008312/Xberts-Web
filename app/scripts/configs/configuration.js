'use strict';

angular.module('xbertsApp')
  .provider('Configuration', ['defaultConfiguration', 'overrideConfiguration',
    function (defaultConfiguration, overrideConfiguration) {
      var mergedConfig = angular.merge(defaultConfiguration, overrideConfiguration);

      angular.extend(this, mergedConfig);
      this.$get = function() {
        return mergedConfig;
      };
  }]);
