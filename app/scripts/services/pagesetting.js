'use strict';

angular.module('xbertsApp')
  .factory('PageService', ['$rootScope',
    function ($rootScope) {
      function Page(title, description, background) {
        this._title = title || 'Xberts - Innovations worth spreading';
        this._description = description || 'Xberts.com is a global platform to curate, promote and bring the next generation of smart devices to global market.';
        this._backgroundColor = background || 'background-whitem';

        this.setTitle = function (title) {
          this._title = title;
        };
        this.setDescription = function (description) {
          this._description = description;
        };
        this.setBackgroundColor = function (background) {
          this._backgroundColor = background;
        }
      }

      function setPage(page) {
        $rootScope.page = new Page();
      }
      console.log("page initializing");

      $rootScope.page = new Page();


      return {
        setBackground: setPage
      };
    }]);
