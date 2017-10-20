angular.module('xbertsApp')
  .factory('SearchModel',['$state','urlParser','$sce','SystemConstant',SearchModel]);
function SearchModel($state,urlParser,$sce,SystemConstant) {

  function SearchModel(data) {
    angular.extend(this, data);
  }

  SearchModel.prototype = {
    getImageUrl: function(url, domain) {
      if(url == null) {
        return false;
      }
      var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
      var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
      var list = SystemConstant.IMAGE_UPLOAD_TYPE[domain].list1;
      var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
      var baseUrl = SystemConstant.IMAGE_BASE_URL;
      var domainFile = url.split(baseUrl)[1];
      if(domainFile != null) {
        var file = url.split(originUrl)[1];
        if(file != null) {
          return SystemConstant.IMAGE_ACCESS_URL + '/public/' + category + '/' + use + '/' + list + '/' + file;
        } else {
          return SystemConstant.IMAGE_ACCESS_URL + domainFile;
        }
      } else {
        return url;
      }
    },
    getFixedImageUrl: function(url, domain) {
      if(url == null) {
        return false;
      }
      var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
      var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
      var list = SystemConstant.IMAGE_UPLOAD_TYPE[domain].list;
      var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
      var baseUrl = SystemConstant.IMAGE_BASE_URL;
      var domainFile = url.split(baseUrl)[1];
      if(domainFile != null) {
        var file = url.split(originUrl)[1];
        if(file != null) {
          return SystemConstant.IMAGE_ACCESS_URL + '/public/' + category + '/' + use + '/' + list + '/' + file;
        } else {
          return SystemConstant.IMAGE_ACCESS_URL + domainFile;
        }
      } else {
        return url;
      }

    },
    getArticlesImage: function(url, domain) {
      var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
      var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
      var list = SystemConstant.IMAGE_UPLOAD_TYPE[domain].list;
      var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
      var file = url.split(originUrl)[1];
      if(file != null) {
        return SystemConstant.IMAGE_ACCESS_URL + '/public/' + category + '/' + use + '/' + list + '/' + file;
      } else {
        return url;
      }
    },
    getVideo: function() {
      var baseUrl = null, baseKey = null;
      switch(urlParser.parse(this.videoUrl).hostname){
        case 'www.youtube.com':
          baseUrl = '//www.youtube.com/embed/';
          baseKey = urlParser.parse(this.videoUrl).searchObject.v;
          baseUrl = !baseKey?null:$sce.trustAsResourceUrl(baseUrl + baseKey);
          break;
        case 'youtu.be':
          baseUrl = '//www.youtube.com/embed/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
          break;
        case 'vimeo.com':
          baseUrl = '//player.vimeo.com/video/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
          break;
        default:
          break;
      }
      return baseUrl;
    },
    getLatestUserId: function() {
      return this.latestAnswer.owner.id;
    },
    getLatestUserAvatar: function () {
      return this.latestAnswer.owner.avatar || false;
    },
    getLatestUserName: function () {
      return this.latestAnswer.owner.firstName;
    },
    getLatestUserPosition: function () {
      if(this.latestAnswer.owner.position && this.latestAnswer.owner.company) {
        return this.latestAnswer.owner.position +" @ "+ this.latestAnswer.owner.company;
      } else if(this.latestAnswer.owner.position && !this.latestAnswer.owner.company) {
        return this.latestAnswer.owner.position;
      } else if(!this.latestAnswer.owner.position && this.latestAnswer.owner.company){
        return this.latestAnswer.owner.company;
      } else {
        return "";
      }
    },
    getLatestBadgePoint: function() {
      return this.latestAnswer.owner.badgePoint;
    },
    getOwner: function () {
      return this.owner;
    }
  };

  SearchModel.build = function (data) {
    return new SearchModel(data);
  };

  SearchModel.buildPageList = function (data) {

    data.results = data.results.map(function (item) {
      return SearchModel.build(item);
    });

    return data;
  };

  SearchModel.buildList = function (data) {
    return data.map(function (item) {
      return SearchModel.build(item);
    });
  };

  return SearchModel;
}
