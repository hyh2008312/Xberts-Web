angular.module('xbertsApp')
  .service('AskService', ['$resource','AskModel','API_BASE_URL',function ($resource,AskModel,API_BASE_URL) {
    var AskResource = $resource(API_BASE_URL + '/questions/:id/', {id:'@id'},{'put': {method: 'PUT'},'delete':{method: 'DELETE'}});

    this.getList = function (params) {
      return AskResource.get(params).$promise.then(AskModel.buildPageList);
    };

  }]);
