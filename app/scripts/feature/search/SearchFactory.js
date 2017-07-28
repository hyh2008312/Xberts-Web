'use strict';

angular.module('xbertsApp')
  .factory('SearchFactory', [function () {

    this.sort = 0;

    this.sortList = ['All','Discover','Ask','Trials','Blog'];

    this.from = null;

    return this;

  }]);
