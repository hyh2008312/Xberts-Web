'use strict';

angular.module('xbertsApp')
  .service('Project', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {

    var project = this;

    project.getById = function (projectId) {
      return $resource(API_BASE_URL + '/projects/projects/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}}).get({id: projectId}).$promise;
    };

    project.create = function () {
      var ProjectResource = $resource(API_BASE_URL + '/projects/projects/:id/', {'patch': {method: 'PATCH'}});
      return new ProjectResource();
    };
    project.getDetailById = function (projectId) {
      return $resource(API_BASE_URL + '/projects/projectsonlydetail/:id/').get({id: projectId}).$promise;
    };
    project.approveById = function (projectId, status) {
      var ProjectResource = $resource(API_BASE_URL + '/projects/projects/:id/approve/', {id: projectId});
      if (status) {
        return ProjectResource.save().$promise;
      } else {
        return ProjectResource.delete().$promise;
      }
    };
  }]);
