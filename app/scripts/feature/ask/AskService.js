angular.module('xbertsApp')
  .service('AskService', ['$resource','AskModel','API_BASE_URL',function ($resource,AskModel,API_BASE_URL) {
    var AskResource = $resource(API_BASE_URL + '/questions/:id/', {id:'@id'});
    var AnswersLeaderResource = $resource(API_BASE_URL + '/answers/leaders/', null);


    this.getList = function (params) {
      return AskResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.create = function (params) {
      return AskResource.save(params).$promise;
    };

    this.getAnswerLeaderList = function() {
      return AnswersLeaderResource.get().$promise.then(AskModel.buildPageList);
    };

    this.follow = function (id) {
      return $resource(API_BASE_URL + '/questions/'+id+'/follow/').save().$promise;
    };

  }]);
