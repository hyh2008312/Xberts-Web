'use strict';

angular
  .module('xbertsApp')
  .controller('ReviewApplyController', [
    '$scope',
    'SystemConstant',
    'review',
    'applier',
    'application',
    'ReviewService',
    'ApplicationService',
    '$filter',
    '$state',
    '$q',
    'growl',
    ReviewApplyController
  ]);


function ReviewApplyController($scope, SystemConstant, review, applier, application, ReviewService, ApplicationService, $filter, $state, $q, growl) {
  var self = this;
  self.review = review;
  /*todo: remove this transform to service*/
  self.applier = {
    country: applier.country,
    gender: applier.gender,
    position: applier.position,
    company: applier.position,
    user_id: applier.user_id
  };

  self.application = application || {review: self.review.id, reviewer: self.applier.user_id};
  self.genders = SystemConstant.GENDER_TYPE;
  self.countries = SystemConstant.COUNTRIES;

  self.next = false;


  if (self.application.id) {
    var answer = JSON.parse(application.answer);
    for (var i = 0; i < self.review.surveys.length; i++) {
      for (var j = 0; j < self.review.surveys[i].questions.length; j++) {
        var questionId = self.review.surveys[i].questions[j].id;
        self.review.surveys[i].questions[j]['answer'] = answer['question_' + questionId] || {};
      }
    }
  }

  self.isPaidTrial = function () {
    var deposit = Number(self.review.deposit.deposit_amount.amount);
    return (deposit > 0);
  };

  self.nextStep = function (applyForm) {
    if (applyForm.$valid) {
      self.next = true;
    }
  };

  self.backStep = function () {
    self.next = false;
  };

  self.submitForm = function (applyForm) {
    if (applyForm.$valid) {
      var answer = {};
      for (var x = 0; x < self.review.surveys.length; x++) {
        for (var y = 0; y < self.review.surveys[x].questions.length; y++) {
          answer['question_' + self.review.surveys[x].questions[y].id] = self.review.surveys[x].questions[y].answer;
        }
      }
      self.application.answer = $filter('json')(answer);

      $scope.$emit('backdropOn', 'trial apply');

      var promises = [];

      var applicationPromise = ApplicationService.saveApplication(self.application);
      var applierPromise = ReviewService.saveApplier(self.applier);

      promises.push(applicationPromise);
      promises.push(applierPromise);

      $q.all(promises)
        .then(function () {
          $scope.$emit('backdropOff', 'trial apply success');
          $state.go('application.campaign', {reviewId: self.review.id});
        })
        .catch(function () {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'trial apply failure');
        });
    }
  };
}
