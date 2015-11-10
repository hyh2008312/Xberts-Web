'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.OrganizationLoad
 * @description
 * # OrganizationLoad
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('OrganizationLoad',['Organization','$stateParams','$q',function (Organization,$stateParams,$q) {
    return function(){
      var delay=$q.defer;
      Organization.get({id:$stateParams.organizationId},function(organization){
        delay.resolve(organization);
      },function(){
        delay.reject(('Unable to fetch organization'));
      });
      return delay.promise;
    }
  }]);
