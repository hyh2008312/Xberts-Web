angular.module('xbertsApp')
  .factory('ShareProduct', ['urlParser','$sce',ShareProduct]);
function ShareProduct(urlParser, $sce) {

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
      return this.imageGroup.length>0?this.imageGroup[0].image.original:'';
    },
    getImageThumbnail: function() {
      return this.imageGroup.length>0?this.imageGroup[0].image.thumbnail:'';
    },
    getVideo: function() {
      return $sce.trustAsResourceUrl('//www.youtube.com/embed/' + urlParser.parse(this.videoUrl).searchObject.v);
    },
    getSharePrice: function () {
      return '$' + this.salePrice.amount;
    },
    getShareInteractId: function () {
      return this.interact.id;
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
