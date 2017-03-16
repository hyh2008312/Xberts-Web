angular.module('xbertsApp')
  .factory('ShareProduct', ['urlParser','$sce','$state',ShareProduct]);
function ShareProduct(urlParser, $sce, $state) {

  var AVATAR_PLACEHOLDER = 'https://xberts.imgix.net/static/icon/avatar_empty.gif?s=5b6b11a25bfa12e3a94966eb077ef16a';


  function ShareProduct(data) {
    angular.extend(this, data);
  }

  ShareProduct.prototype = {
    getShareAvatar: function () {
      return this.owner.userprofile.avatar || AVATAR_PLACEHOLDER;
    },
    getShareName: function () {
      return this.owner.firstName;
    },
    getImageOriginal: function() {
      return this.imageGroup.length > 0 ? this.imageGroup[0].imageUrls.original:'';
    },
    getImageThumbnail: function() {
      return this.imageGroup.length > 0 ? this.imageGroup[0].imageUrls.thumbnail:'';
    },
    getShareUrl: function(id) {
      return $state.href("application.shareProductDetail", {reviewId:id},{absolute:true});
    },
    getVideo: function() {
      var baseUrl = '', baseKey = null;
      this.videoUrl = 'https://youtu.be/KJyDwxrW5FA';
      switch(urlParser.parse(this.videoUrl).hostname){
        case 'www.youtube.com':
          baseUrl = '//www.youtube.com/embed/';
          baseKey = urlParser.parse(this.videoUrl).searchObject.v;
          baseUrl = !baseKey?null:$sce.trustAsResourceUrl(baseUrl + baseKey);
          break;
        case 'youtu.be':
          baseUrl = '//www.youtube.com/embed/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
        default:
          break;
      }
      return baseUrl;
    },
    getSharePrice: function () {
      return this.salePrice.amount != '0.00' ? '$' + this.salePrice.amount : false;
    },
    getShareInteractId: function () {
      return this.interact.id;
    },
    getShareInteractLike: function() {
      return this.interact.voteAmount;
    },
    getPostId: function() {
      return this.owner.id;
    }
  };

  ShareProduct.build = function (data) {
    return new ShareProduct(data)
  };

  ShareProduct.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return ShareProduct.build(item);
    });

    return data;
  };

  ShareProduct.buildList = function (data) {
    return data.map(function (item) {
      return ShareProduct.build(item);
    })
  };

  return ShareProduct;
}
