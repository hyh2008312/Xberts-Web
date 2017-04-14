'use strict';

angular.module('xbertsApp')
  .service('ExpertService', ['$resource', 'API_BASE_URL', 'ShareProduct', function ($resource, API_BASE_URL,ShareProduct) {
    var ExpertResource = $resource(API_BASE_URL + '/xberts/experts/:id/');
    this.getExpert = function (id) {
      return ExpertResource.get({id: id}).$promise;
    };
    this.getInviteList = function (params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/invitees/').get(params).$promise.then(ShareProduct.buildPageList);
    };
    this.getPoints = function(id) {
      return $resource(API_BASE_URL + '/xberts/experts/'+id+'/point/').get(id).$promise;
    };
  }]);
