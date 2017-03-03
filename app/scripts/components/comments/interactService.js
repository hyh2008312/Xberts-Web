'use strict';

angular.module('xbertsApp')
  .service('InteractService', ['$resource', 'API_BASE_URL', 'Interact', function ($resource, API_BASE_URL, Interact) {

    var JoinResource = $resource(API_BASE_URL + '/interact/joins/:joinId/', null,
      {
        'vote': {method: 'PUT', params: {vote: true}}
      });

    this.createJoin = function (data) {
      return JoinResource.save(data).$promise;
    };

    this.getJoin = function (interactId, userId) {
      return JoinResource.get({interact_id: interactId, joiner_id: userId}).$promise.then(
        function (data) {
          if (data.count !== undefined && data.count > 0) {
            return data.results[0];
          } else {
            return null;
          }
        }
      );
    };

    this.getVoters = function (interactId) {
      return JoinResource.get({interact_id: interactId}).$promise;
    };

    this.vote = function (data) {
      return JoinResource.vote(data).$promise;
    }

  }]);
