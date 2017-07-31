angular.module('xbertsApp')
  .factory('SearchModel',['$state','urlParser','$sce',SearchModel]);
function SearchModel($state,urlParser,$sce) {

  function SearchModel(data) {
    angular.extend(this, data);
  }

  SearchModel.prototype = {
    getImageUrl: function() {
      return this.imageGroup[0].imageUrls != null ? this.imageGroup[0].imageUrls.original:this.imageUrl;
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
      return this.latestAnswer.owner.userprofile.avatar || false;
    },
    getLatestUserName: function () {
      return this.latestAnswer.owner.firstName;
    },
    getLatestUserPosition: function () {
      if(this.latestAnswer.owner.userprofile.position && this.latestAnswer.owner.userprofile.company) {
        return this.latestAnswer.owner.userprofile.position +" @ "+ this.latestAnswer.owner.userprofile.company;
      } else if(this.latestAnswer.owner.userprofile.position && !this.latestAnswer.owner.userprofile.company) {
        return this.latestAnswer.owner.userprofile.position;
      } else if(!this.latestAnswer.owner.userprofile.position && this.latestAnswer.owner.userprofile.company){
        return this.latestAnswer.owner.userprofile.company;
      } else {
        return "";
      }
    },
    getLatestBadgePoint: function() {
      return this.latestAnswer.owner.badgePoint;
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
