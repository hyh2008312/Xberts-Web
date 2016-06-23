'use strict';

angular.module('xbertsApp')
  .factory('ProjectLoad', ['ProjectsNoDetail', '$q', 'localStorageService','$state','$rootScope',
    function (ProjectsNoDetail, $q, localStorageService,$state,$rootScope) {
      return function ($stateParams) {
        var projectId = Number($stateParams.projectId);
        var projects = localStorageService.get('project_items') || [];
        var project = null;
        for (var i = 0; i < projects.length; i++) {
          if (projectId === projects[i].id) {
            project = projects[i];
          }
        }
        if (project === null) {
          var delay = $q.defer();
          ProjectsNoDetail.get({id: projectId}, function (project) {
            delay.resolve(project);
          }, function () {
            delay.reject(('Unable to fetch project'));
            $rootScope.$emit('backdropOff', 'off');
            $state.go('application.error');
          });
          return delay.promise;
        } else {
          return project;
        }
      };
    }]);
