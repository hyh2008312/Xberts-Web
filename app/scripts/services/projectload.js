'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.ProjectLoad
 * @description
 * # ProjectLoad
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('ProjectLoad', ['Project','$stateParams','$q',function (Project,$stateParams,$q) {
    return function(){
      var delay=$q.defer;
      Project.get({id:$stateParams.projectId},function(project){
        delay.resolve(project);
      },function(){
        delay.reject(('Unable to fetch project'));
      });
      return delay.promise;
    }
  }]);
