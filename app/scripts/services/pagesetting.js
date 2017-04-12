'use strict';

angular.module('xbertsApp')
  .factory('PageService', ['$location',
    function ($location) {
      function Page(title, description, background, shareImage,hiddenFooter) {
        this._title = title || 'Xberts – Explore innovative gadgets and designs';
        this._description = description || 'Xberts is a community for you to discover, try and share the latest tech innovations and creative designs.';
        this._backgroundColor = background || 'background-bg-light';
        this._shareImage = shareImage || 'https://xberts.imgix.net/static/logo/xberts_logo_sqaure_200x200.jpg?s=17eb238192e044bc8909cd83c934da82';
        this._hiddenFooter = hiddenFooter && true;

        this.setTitle = function (title) {
          this._title = title;
        };
        this.setDescription = function (description) {
          this._description = description;
        };
        this.setBackgroundColor = function (background) {
          this._backgroundColor = background;
        };
        this.setShareImage = function (shareImage) {
          this._shareImage = shareImage;
        };
        this.setPage = function (title, description, background, shareImage,hiddenFooter) {
          this._title = title || 'Xberts – Explore innovative gadgets and designs';
          this._description = description || 'Xberts is a community for you to discover, try and share the latest tech innovations and creative designs.';
          this._backgroundColor = background || 'background-bg-light';
          this._shareImage = shareImage || 'https://xberts.imgix.net/static/logo/xberts_logo_sqaure_200x200.jpg?s=17eb238192e044bc8909cd83c934da82';
          this._hiddenFooter = hiddenFooter && true;
        };
        this.getUrl=function(){
           return $location.absUrl();
        };
        this.setHiddenFooter = function (hiddenFooter) {
          this._hiddenFooter = hiddenFooter;
        };
      }

      var page = new Page();


      return {
        pageSetting: page
      }
    }]);
