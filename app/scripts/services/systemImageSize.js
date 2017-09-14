'use strict';

angular.module('xbertsApp')
  .service('systemImageSizeService', ['$http','$sce','SystemConstant',
    function ($http,$sce,SystemConstant) {
      var self = this;

      var url = $sce.trustAsResourceUrl("http://image.xberts.com/image/upload/done");

      self.getImageUrl = function(name,use,category) {
        return {};
      };

      self.setImageUrl = function (name,domain) {

        var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
        var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
        var detail = SystemConstant.IMAGE_UPLOAD_TYPE[domain].detail;
        var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
        var file = name.split(originUrl)[1];
        return $http.jsonp(url,{params:{
          name: name,
          use: use,
          category: category
        },jsonpCallbackParam: 'callback'}).then(function(data) {

        }, function(data) {
          return {
            imageUrl: SystemConstant.IMAGE_BASE_URL + '/public/' + category + '/' + use + '/' + detail + '/' + file
          };
          //return {
          //  status: -1
          //};
        });
      };

    }]);
