'use strict';

angular.module('xbertsApp')
  .service('ExpertService', ['$rootScope','$resource', 'API_BASE_URL', 'ShareProduct','$q','AskModel',
    function ($rootScope,$resource, API_BASE_URL,ShareProduct,$q,AskModel) {
    var ExpertResource = $resource(API_BASE_URL + '/xberts/experts/:id/');
    var ExpertAchievementResource = $resource(API_BASE_URL + '/xberts/experts/:id/achievement/');
    var ExpertFollowingQuestionsResource = $resource(API_BASE_URL + '/xberts/experts/:id/followed_questions/');
    var ExpertPostResource = $resource(API_BASE_URL + '/xberts/experts/:id/products/',{id: '@id'});

    this.getExpert = function (id) {
      return ExpertResource.get({id: id}).$promise;
    };

    this.getPostList = function (params) {
      return ExpertPostResource.get(params).$promise.then(ShareProduct.buildPageList);
    };

    this.getInviteList = function (params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/invitees/').get(params).$promise.then(ShareProduct.buildPageList);
    };
    this.getPoints = function(id) {
      var delay = $q.defer();
      if($rootScope.user.getUserId() == id) {
        return $resource(API_BASE_URL + '/xberts/experts/'+id+'/point/').get(id).$promise;
      }
      delay.reject(('Some error happened'));
      return delay.promise;
    };

    this.getQuestionsList = function(params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/questions/').get(params).$promise.then(AskModel.buildPageList);
    };

    this.getAnswersList = function(params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/answers/').get(params).$promise.then(AskModel.buildPageList);
    };

    this.follow = function(params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/follow/').save().$promise;
    };

    this.followees = function(params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/followees/').get(params).$promise.then(ShareProduct.buildPageList);
    };

    this.followers = function(params) {
      return $resource(API_BASE_URL + '/xberts/experts/'+params.id+'/followers/').get(params).$promise.then(ShareProduct.buildPageList);
    };

    this.getAchievement = function(id) {
      return ExpertAchievementResource.get({id:id}).$promise;
    };

    this.getFollowingQuestion = function(params) {
      return ExpertFollowingQuestionsResource.get(params).$promise.then(AskModel.buildPageList);
    };
  }]);
