'use strict';

angular.module('xbertsApp')
  .factory('Interact', ['$resource', 'Configuration', function($resource, Configuration) {
    return {
      Join: function(otherParams) {
        var params = {joinId: '@id'};
        angular.extend(params, otherParams);
        return $resource(Configuration.apiBaseUrl + '/interact/joins/:joinId/',
          params,
          {'vote': {method: 'PUT', params: {vote: true}}})
      },
      Following: function(otherParams) {
        var params = {};
        angular.extend(params, otherParams);
        return $resource(Configuration.apiBaseUrl + '/interact/followings/', params)
      },
      Feedback: function(otherParams) {
        var params = {feedbackId: '@id'};
        angular.extend(params, otherParams);
        return $resource(Configuration.apiBaseUrl + '/interact/feedbacks/:feedbackId/', params)
      },
      Comment: function(otherParams) {
        var params = {commentId: '@id'};
        angular.extend(params, otherParams);
        return $resource(Configuration.apiBaseUrl + '/interact/comments/:commentId/', params)
      }
    };
  }]);
