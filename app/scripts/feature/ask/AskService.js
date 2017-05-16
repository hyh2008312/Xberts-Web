angular.module('xbertsApp')
  .service('AskService', ['$resource','AskModel','API_BASE_URL',function ($resource,AskModel,API_BASE_URL) {
    var AskResource = $resource(API_BASE_URL + '/questions/:id/', {id:'@id'});
    var AnswersResource = $resource(API_BASE_URL + '/answers/', null);
    var AnswersLeaderResource = $resource(API_BASE_URL + '/answers/leaders/', null);

    this.order = 0;

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

    this.getQuestionsDetail = function(id) {
      return AskResource.get({id:id}).$promise.then(AskModel.build);
    };

    this.getAnswersList = function(params) {
      return AnswersResource.get(params).$promise.then(AskModel.build);
    };

    this.createAnswers = function(params) {
      return AnswersResource.save(params).$promise.then(AskModel.build);
    };

  }]);
