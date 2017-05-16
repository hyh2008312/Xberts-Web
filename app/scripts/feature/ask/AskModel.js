angular.module('xbertsApp')
  .factory('AskModel',['$state','urlParser','$sce',AskModel]);
function AskModel($state,urlParser,$sce) {

  function AskModel(data) {
    angular.extend(this, data);
  }

  AskModel.prototype = {
    getAnswerUserId: function() {
      return this.owner.id;
    },
    getAnswerUserAvatar: function () {
      return this.owner.userprofile.avatar || false;
    },
    getAnswerUserName: function () {
      return this.owner.firstName;
    },
    getOwnerBadgePoint: function() {
      return this.owner.badgePoint;
    },
    getShareUrl: function(id) {
      return $state.href("application.shareProductDetail", {reviewId:id},{absolute:true});
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
    getProdcutLink: function() {
      return this.latestAnswer?this.latestAnswer.productLink.url:false;
    }
  };

  AskModel.build = function (data) {
    return new AskModel(data)
  };

  AskModel.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return AskModel.build(item);
    });

    return data;
  };

  AskModel.buildList = function (data) {
    return data.map(function (item) {
      return AskModel.build(item);
    })
  };

  return AskModel;
}
