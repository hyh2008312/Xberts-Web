'use strict';
angular.module('xbertsApp')
  .service('SocialShare', ['$resource','urlParser','API_BASE_URL',function ($resource, urlParser, API_BASE_URL) {

    var SocialShareResource = $resource(API_BASE_URL + '/shares/');

    this.createSocialShare = function(url) {
      var _urlParser = urlParser.parse(url);
      if(_urlParser.searchObject.share == undefined) {
        return false;
      }
      if(_urlParser.searchObject.channel == undefined) {
        return false;
      }
      return SocialShareResource.save({
        share:_urlParser.searchObject.share,
        url:_urlParser.pathname,
        channel:_urlParser.searchObject.channel
      }).$promise.then(function() {

      });
    };
  }]);
