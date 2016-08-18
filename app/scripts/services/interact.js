'use strict';

angular.module('xbertsApp')
  .factory('Interact', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return {
      Join: function(otherParams) {
        var params = {joinId: '@id'};
        angular.extend(params, otherParams);
        return $resource(API_BASE_URL + '/interact/joins/:joinId/',
          params,
          {'vote': {method: 'PUT', params: {vote: true}}})
      },
      Feedback: function(otherParams) {
        var params = {feedbackId: '@id'};
        angular.extend(params, otherParams);
        return $resource(API_BASE_URL + '/interact/feedbacks/:feedbackId/', params)
      },
      Comment: function(otherParams) {
        var params = {commentId: '@id'};
        angular.extend(params, otherParams);
        return $resource(API_BASE_URL + '/interact/comments/:commentId/', params)
      }
    };
  }]);
