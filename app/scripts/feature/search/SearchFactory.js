'use strict';

angular.module('xbertsApp')
  .factory('SearchFactory', [function () {

    this.sort = 0;

    this.askFrom = null;

    this.productFrom = null;

    return this;

  }]);
