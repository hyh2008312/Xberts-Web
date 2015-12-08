'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Interact
 * @description
 * # Interact
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Interact', ['$resource', function ($resource) {
    return {
      Join: function (otherParams) {
        var params = {joinId: '@id'};
        angular.extend(params, otherParams);
        return $resource('/interact/joins/:joinId/', params, {'vote': {method: 'PUT', params: {vote: true}}})
      },
      Following: function (otherParams) {
        var params = {};
        angular.extend(params, otherParams);
        return $resource('/interact/followings/', params)
      },
      Feedback: function (otherParams) {
        var params = {feedbackId: '@id'};
        angular.extend(params, otherParams);
        return $resource('/interact/feedbacks/:feedbackId/', params)
      },
      Comment: function (otherParams) {
        var params = {commentId: '@id'};
        angular.extend(params, otherParams);
        return $resource('/interact/comments/:commentId/', params)
      }
    };
  }]);
