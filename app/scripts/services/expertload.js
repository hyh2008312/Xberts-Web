'use strict';

angular.module('xbertsApp')
  .factory('ExpertLoad',  ['Expert', '$q', 'localStorageService',
    function (Expert, $q, localStorageService) {
      function getExpert($stateParams) {
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
            delay.resolve(project);
          }, function () {
            delay.reject(('Unable to fetch project'));
          });
          return delay.promise;
        } else {
          return expert;
        }
      }

      function deleteExpert(id) {
        var experts = localStorageService.get('expert_items') || [];
        var index;

        for (var i = 0; i < experts.length; i++) {
          if (id === experts[i].user_id) {
            index = i;
          }
        }

        if (index !== undefined) {
          experts.splice(index, 1);
        }
      }

      return {
        get: getExpert,
        delete: deleteExpert
      }
    }]);
