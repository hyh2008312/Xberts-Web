'use strict';

angular.module('xbertsApp')
  .service('systemImageSizeService', ['$http','$sce','SystemConstant',
    function ($http,$sce,SystemConstant) {
      var self = this;

      var _link = 'https://image.xberts.com/image/upload/done';
      var url = $sce.trustAsResourceUrl(_link);

      self.setImageUrl = function (name,domain) {

        var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
        var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
        var detail = SystemConstant.IMAGE_UPLOAD_TYPE[domain].detail;
        var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
        var list = SystemConstant.IMAGE_UPLOAD_TYPE[domain].list;
        var file = name.split(originUrl)[1];
        return $http.get(url,{
          withCredentials: false,
          params:{
            name: name,
            use: use,
            category: category,
            no_auth: true
          },
          jsonpCallbackParam: 'callback'
        }).then(function(data) {
          if(list) {
            return {
              imageUrl: name
            };
          }
          return {
            imageUrl: SystemConstant.IMAGE_ACCESS_URL + '/public/' + category + '/' + use + '/' + detail + '/' + file
          };
        }, function(data) {
          return {
            status: -1
          };
        });
      };

      self.convertBase64UrlToFile = function(dataURI, $file, domain){
        if($file == null) {
          $file = {};
          $file.name = domain + new Date().getTime();
        }
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        var file = new File([new Uint8Array(array)], name, {type: mimeString});
        var URL = window.URL || window.webkitURL;
        var url = URL.createObjectURL(file);
        file.$ngfBlobUrl = url;
        return file;
      };

    }]);
