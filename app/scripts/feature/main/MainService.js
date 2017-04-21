angular.module('xbertsApp')
  .service('MainService', ['$resource','MainModel','API_BASE_URL',function ($resource, MainModel, API_BASE_URL) {

    var BannerResource = $resource(API_BASE_URL + '/contents/mainPageTopBanners/',null);
    var ReportResource = $resource(API_BASE_URL + '/review/reports/:id/');

    this.bannerList = null;

    this.getBannerList = function(params) {
      if(this.bannerList == null) {
        this.bannerList = BannerResource.query(params).$promise.then(MainModel.buildList);
      }
      return this.bannerList;
    };

    this.getList = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}).get(params).$promise.then(MainModel.buildPageList);
    };

    this.getReviewsList = function (params) {
      return ReportResource.get(params).$promise.then(MainModel.buildPageList);
    };
    this.getRecommendedReviewers = function () {
      return $resource(API_BASE_URL + '/xberts/reviewers/', {recommended: 'True'}).get().$promise.then(MainModel.buildPageList);
    };

  }]);
