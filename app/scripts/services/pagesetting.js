'use strict';

angular.module('xbertsApp')
  .factory('PageService', ['$rootScope',
    function () {
      function Page(title, description, background, shareImage) {
        this._title = title || 'Xberts - Innovations worth spreading';
        this._description = description || 'Xberts.com is a global platform to curate, promote and bring the next generation of smart devices to global market.';
        this._backgroundColor = background || 'background-light-white';
        this._shareImage = shareImage || 'https://xberts.com/images/landing_1_1.d836e5d1.jpg';

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
        this.setPage = function (title, description, background, shareImage) {
          this._title = title || 'Xberts - Innovations worth spreading';
          this._description = description || 'Xberts.com is a global platform to curate, promote and bring the next generation of smart devices to global market.';
          this._backgroundColor = background || 'background-light-white';
          this._shareImage = shareImage || 'https://xberts.com/images/landing_1_1.d836e5d1.jpg';
        }
      }

      var page = new Page();


      return {
        pageSetting: page
      }
    }]);
