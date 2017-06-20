'use strict';

angular.module('xbertsApp')
  .factory('ProductDeals',['$state','urlParser','$sce',ProductDeals]);
function ProductDeals($state,urlParser,$sce) {

  function ProductDeals(data) {
    angular.extend(this, data);
  }

  ProductDeals.prototype = {
    getDealsAvatar: function () {
      return this.owner != null?this.owner.userprofile.avatar : '';
    },
    getDealsName: function () {
      return this.owner != null?this.owner.firstName : "Editors' Pick";
    },
    getImageUrl: function() {
      return this.imageGroup.length > 0 ? this.imageGroup[0].imageUrls.original:this.imageUrl;
    },
    getPostId: function() {
      return this.owner != null?this.owner.id : false;
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
    getSharePrice: function () {
      return this.salePrice.amount != '0.00' ? '$' + this.salePrice.amount : false;
    },
    getDomain: function() {
      var baseUrl = this.purchaseUrl;
      if(baseUrl == '') {
        return '';
      }
      var host = urlParser.parse(baseUrl).hostname.split('.');
      if(host.length == 2) {
        return host[0];
      } else if(host.length == 3) {
        return host[1];
      }
      return '';
    },
    buyNow: function (category) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'buy-product-btn-click',
          category:category,
          productTitle: this.title
        });
      }

      window.open(this.purchaseUrl);
    },
    getShareUrl: function(id) {
      return $state.href("application.dealsDetail", {dealsId:id},{absolute:true});
    }
  };

  ProductDeals.build = function (data) {
    return new ProductDeals(data);
  };

  ProductDeals.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return ProductDeals.build(item);
    });

    return data;
  };

  ProductDeals.buildList = function (data) {
    return data.map(function (item) {
      return ProductDeals.build(item);
    })
  };

  return ProductDeals;
}
