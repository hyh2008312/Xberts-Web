'use strict';

angular.module('xbertsApp')
  .factory('ExpertLoad', ['Expert', '$q', 'localStorageService','$rootScope','$state',
    function (Expert, $q, localStorageService,$rootScope,$state) {
      function getExpert($stateParams) {
        var expertId = Number($stateParams.expertId);
        var delay = $q.defer();
        Expert.get({id: expertId}, function (project) {
          delay.resolve(project);
        }, function () {
          delay.reject(('Unable to fetch expert'));
          $rootScope.$emit('backdropOff', 'off');
          $state.go('application.error');
        });
        return delay.promise;

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
