'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.DistributionLoad
 * @description
 * # DistributionLoad
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('DistributionLoad', ['Distribution','$q',function (Distribution,$q) {
    return function($stateParams){
      var delay=$q.defer();
      Distribution.query({project_id:$stateParams.projectId},function(distribuitons){
        delay.resolve(distribuitons);
      },function(){
        console.log("'Unable to fetch distributions'");
        delay.reject(('Unable to fetch distributions'));
      });
      return delay.promise;
    };
  }]);
