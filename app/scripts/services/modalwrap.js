'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.modalWrap
 * @description
 * # modalWrap
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('modalWrap',['$uibModal', function ($uibModal) {
    // Service logic
    // Public API here
    return  function(templateUrl,controller){
      var modalWrap={
        templateUrl:templateUrl,
        controller:controller,
        open:function(size,resolve,successCallback,failCallback){
          var self=this;
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
