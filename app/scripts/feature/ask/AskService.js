angular.module('xbertsApp')
  .service('AskService', ['$resource','AskModel','API_BASE_URL',function ($resource,AskModel,API_BASE_URL) {
    var AskResource = $resource(API_BASE_URL + '/questions/:id/', {id:'@id'},{'patch': {method: 'PATCH'},'delete':{method: 'DELETE'}});
    var AnswersResource = $resource(API_BASE_URL + '/answers/:id/', {id:'@id'},{'patch': {method: 'PATCH'},'delete':{method: 'DELETE'}});
    var AnswersLeaderResource = $resource(API_BASE_URL + '/answers/leaders/', null);
    var FollowerResource = $resource(API_BASE_URL + '/questions/followed/', null);
    var PopularResource = $resource(API_BASE_URL + '/questions/popular/');
    var PendingResource = $resource(API_BASE_URL + '/questions/pending/');

    this.order = 0;

    this.getList = function (params) {
      return AskResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.getPending = function (params) {
      return PendingResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.getPopularList = function(params) {
      return PopularResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.create = function (params) {
      return AskResource.save(params).$promise;
    };

    this.getAnswerLeaderList = function(params) {
      return AnswersLeaderResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.follow = function (id) {
      return $resource(API_BASE_URL + '/questions/'+id+'/follow/').save().$promise;
    };

    this.getQuestionsDetail = function(id) {
      return AskResource.get({id:id}).$promise.then(AskModel.build);
    };

    this.updateQuestion = function (data) {
      return AskResource.patch(data).$promise.then(AskModel.build);
    };

    this.deleteQuestion = function (data) {
      return AskResource.delete(data).$promise.then(AskModel.build);
    };

    this.getAnswersList = function(params) {
      return AnswersResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.getAnswer = function(params) {
      return AnswersResource.get(params).$promise.then(AskModel.build);
    };

    this.createAnswers = function(params) {
      return AnswersResource.save(params).$promise.then(AskModel.build);
    };

    this.updateAnswer = function(params) {
      return AnswersResource.patch(params).$promise.then(AskModel.build);
    };

    this.deleteAnswer = function (data) {
      return AnswersResource.delete(data).$promise.then(AskModel.build);
    };

    this.followList = function(params) {
      return FollowerResource.get(params).$promise.then(AskModel.buildPageList);
    };

    this.report = function(params) {
      return $resource(API_BASE_URL + '/answers/'+params.id+'/report/').save(params).$promise;
    };

    this.getSort = function() {
      return [{
        value: 0,
        name: 'Weekly'
      },{
        value: 1,
        name: 'Overall'
      }];
    };

    this.askPaginator = {};
    this.topReviewers = null;
  }]);
