'use strict';

angular.module('xbertsApp')
  .factory('modalWrap', ['$uibModal', function($uibModal) {
    return function(templateUrl, controller) {
      var modalWrap = {
        templateUrl: templateUrl,
        controller: controller,
        open: function(size, resolve, successCallback, failCallback) {
          var self = this;
          var modalInstance = $uibModal.open({
            templateUrl: self.templateUrl,
            controller: self.controller,
            size: size,
            resolve: resolve
          });
          modalInstance.result.then(successCallback, failCallback);
        }
      };
      return modalWrap;
    };
  }]);
