angular.module('xbertsApp')
  .controller('TestController', ['FacebookService', function (FacebookService) {
    var test = this;

    test.invite = FacebookService.inviteFriend;
  }]);
