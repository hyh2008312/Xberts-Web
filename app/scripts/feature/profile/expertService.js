'use strict';

angular.module('xbertsApp')
  .service('ExpertService', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    var ExpertResource = $resource(API_BASE_URL + '/xberts/experts/:id/');
    this.getExpert = function (id) {
      return ExpertResource.get({id: id}).$promise;
    }
  }]);
