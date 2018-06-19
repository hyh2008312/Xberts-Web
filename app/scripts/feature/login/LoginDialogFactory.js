'use strict';

angular.module('xbertsApp')
  .factory('LoginDialogFactory', function () {

    this.timer = null;

    this.signUpDialog = false;

    this.dialogfirstTime = false;

    return this;
  });
