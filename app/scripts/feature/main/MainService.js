angular.module('xbertsApp')
  .service('MainService', ['$resource','MainModel','API_BASE_URL',function ($resource, MainModel, API_BASE_URL) {

    var BannerResource = $resource(API_BASE_URL + '/contents/mainPageTopBanners/',null,{
      'query' : {
        method:'GET',
        params:{
          no_auth: true
        },
        isArray:true
      }
    });

    // cache data
    this.bannerList = null;
    this.dealsPaginator = null;
    this.latestPaginater = null;
    this.reviewsFeaturedTop = null;
    this.askPaginator = null;
    this.topReviewers = null;

    this.getBannerList = function(params) {
      if(this.bannerList == null) {
        this.bannerList = BannerResource.query(params).$promise.then(MainModel.buildList);
      }
      return this.bannerList;
    };


  }]);
