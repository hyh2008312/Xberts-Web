'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.DistributionLoad
 * @description
 * # DistributionLoad
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('DistributionLoad', ['Distribution','$stateParams','$q',function (Distribution,$stateParams,$q) {
    return function(){
      var delay=$q.defer;
      Distribution.query({project_id:$stateParams.projectId},function(distribuitons){
        delay.resolve(distribuitons);
      },function(){
        delay.reject(('Unable to fetch project'));
      });
      return delay.promise;
    };
  }]);
