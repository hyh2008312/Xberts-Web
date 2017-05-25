'use strict';

angular.module('xbertsApp')
  .service('ExpertService', ['$rootScope','$resource', 'API_BASE_URL', 'ShareProduct','$q',function ($rootScope,$resource, API_BASE_URL,ShareProduct,$q) {
    var ExpertResource = $resource(API_BASE_URL + '/xberts/experts/:id/');
    var ExpertAchievementResource = $resource(API_BASE_URL + '/xberts/experts/:id/achievement/');

    this.getExpert = function (id) {
      return ExpertResource.get({id: id}).$promise;
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
  }]);
