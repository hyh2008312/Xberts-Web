'use strict';

angular
  .module('xbertsApp')
  .controller('ReviewApplyController', ['SystemConstant','review','applier','applicant', ReviewApplyController]);


function ReviewApplyController(SystemConstant,review,applier,applicant) {
  var self = this;
  self.applier={};
  self.review=review;
  self.reviewer=applier;
  self.applicant=applicant;
  self.genders = SystemConstant.GENDER_TYPE;
  self.countries = SystemConstant.COUNTRIES;
  console.log(review)
  console.log(applier)
  console.log(applicant)
}
