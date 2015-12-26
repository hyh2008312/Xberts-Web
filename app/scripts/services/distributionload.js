'use strict';

angular.module('xbertsApp')
  .factory('DistributionLoad', ['Distribution', '$q', function(Distribution, $q) {
    return function($stateParams){
      var delay=$q.defer();
      Distribution.query({project_id:$stateParams.projectId},function(distribuitons){
        delay.resolve(distribuitons);
      },function(){
        delay.reject(('Unable to fetch project'));
      });
      return delay.promise;
    };
  }]);
