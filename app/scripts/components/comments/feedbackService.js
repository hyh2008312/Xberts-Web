angular.module('xbertsApp')
  .service('FeedbackService', ['$resource', 'API_BASE_URL', 'Feedback', function ($resource, API_BASE_URL, Feedback) {

    var FeedbackResource = $resource(API_BASE_URL + '/interact/feedbacks/:feedbackId/', null);

    this.getList = function (params) {
      return FeedbackResource.get(params).$promise.then(Feedback.buildPageList);
    };

    this.create = function (feedback) {
      return FeedbackResource.save(feedback).$promise.then(Feedback.build);
    }

  }]);
