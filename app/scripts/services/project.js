'use strict';

angular.module('xbertsApp')
  .service('Project', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {

    this.getById = function (projectId) {
      return $resource(API_BASE_URL + '/projects/projects/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}}).get({id: projectId}).$promise;
    };

    this.create = function () {
      var Pro = $resource(API_BASE_URL + '/projects/projects/:id/', {'patch': {method: 'PATCH'}});
      return new Pro();
    };
    this.getDetailById = function (projectId) {
      return $resource(API_BASE_URL + '/projects/projectsonlydetail/:id/').get({id: projectId}).$promise;
    };
    this.approveById = function (projectId, status) {
      var project = $resource(API_BASE_URL + '/projects/projects/:id/approve/', {id: projectId});
      if (status) {
        return project.save().$promise;
      } else {
        return project.delete().$promise;
      }
    };
  }]);
