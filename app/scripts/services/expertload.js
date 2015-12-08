'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ExpertLoad
 * @description
 * # ExpertLoad
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ExpertLoad',  ['Expert', '$q', 'localStorageService',
    function (Expert, $q, localStorageService) {
      return function ($stateParams) {
        var expertId = Number($stateParams.expertId);
        var experts = localStorageService.get('expert_items') || [];
        var expert = null;
        for (var i = 0; i < experts.length; i++) {
          if (expertId === experts[i].user_id) {
            expert = experts[i];
          }
        }
        if (expert === null) {
          var delay = $q.defer();
          Expert.get({id: expertId}, function (project) {
            console.log(project);
            delay.resolve(project);
          }, function () {
            delay.reject(('Unable to fetch project'));
          });
          return delay.promise;
        } else {
          return expert;
        }
      };
    }]);
