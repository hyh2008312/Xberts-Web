'use strict';

angular.module('xbertsApp')
  .factory('PageService', ['$location',
    function ($location) {
      function Page(title, description, background, shareImage,hiddenFooter) {
        this._title = title || 'Xberts - Discover Creative Products Through Expert Reviews';
        this._description = description || 'Xberts is a community-curated marketplace for people to explore the best tech and designs through unbiased reviews from experts and opinion leaders.';
        this._backgroundColor = background || 'background-bg-light';
        this._shareImage = shareImage || 'https://xberts.com/images/xberts.03f0d97d.png';
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
          this._title = title || 'Xberts - Discover Creative Products Through Expert Reviews';
          this._description = description || 'Xberts is a community-curated marketplace for people to explore the best tech and designs through unbiased reviews from experts and opinion leaders.';
          this._backgroundColor = background || 'background-bg-light';
          this._shareImage = shareImage || 'https://xberts.com/images/xberts.03f0d97d.png';
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
