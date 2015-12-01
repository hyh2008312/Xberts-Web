'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.ProjectLoad
 * @description
 * # ProjectLoad
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('ProjectLoad', ['ProjectsNoDetail', '$q', 'localStorageService',
    function (ProjectsNoDetail, $q, localStorageService) {
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
            console.log(project);
            delay.resolve(project);
          }, function () {
            delay.reject(('Unable to fetch project'));
          });
          return delay.promise;
        } else {
          return project;
        }
      };
    }]);
