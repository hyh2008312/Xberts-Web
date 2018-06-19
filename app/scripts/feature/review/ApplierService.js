angular.module('xbertsApp')
  .service('ApplierService', ['$resource', 'API_BASE_URL', '$rootScope', function ($resource, API_BASE_URL, $rootScope) {
    var self = this;
    var ApplierResource = $resource(
      API_BASE_URL + '/xberts/reviewers/:id/',
      null,
      {
        'update': {method: 'PUT'},
        'confirmAddress': {method: 'PUT', params: {action: 'confirm'}}
      }
    );

    self.getApplier = function (userId) {
      return ApplierResource.get({id: userId}).$promise;
    };
    self.getCurrentApplier = function () {
      return self.getApplier($rootScope.user.getUserId())
    };

    self.updateApplier = function (data, type) {
      var params = {id: data.user_id || data.userId};
      if (type === 'confirm') {
        return ApplierResource.confirmAddress(params, data).$promise;
      }
      return ApplierResource.update(params, data).$promise;
    };
  }]);
