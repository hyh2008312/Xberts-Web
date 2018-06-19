'use strict';

angular.module('xbertsApp')
  .filter('trust', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])
  .filter('length', function () {
    return function (array) {
      return array.length;
    };
  })
  .filter('buttonText', function() {
    return function (value) {
      switch(value) {
        case 'PRODUCT_INQUIRY':
          return 'View Inquiry';
          break;
        case 'REVIEW_QUESTION':
          return 'Answer Question';
          break;
        case 'FEEDBACK':
        case 'COMMENT':
          return 'Reply';
          break;
        case 'LIKE':
          return 'View Review';
          break;
        case 'CONFIRM_ADDRESS':
        case 'CONFIRM_ADDRESS_REMINDER':
          return 'Confirm Address';
          break;
        case 'REVIEW_APPLICATION':
          return 'Edit Application';
          break;
        case 'REVIEW_SELECTION_ANNOUNCEMENT':
          return 'View More Campaigns';
          break;
        case 'REVIEW_SELECTION_REVOKE':
          return 'Review Details';
          break;
        case 'REPORT_CHECK_IN':
        case 'REPORT_REMINDER':
        case 'REPORT_PAST_DUE':
          return 'Submit Review';
          break;
        case 'SHIPPING_NOTIFICATION':
          return 'Check Review Guide';
          break;
        case 'REPORT_APPROVED':
          return 'View Review';
          break;
        case 'REPORT_SUBMISSION':
        case 'REPORT_DISAPPROVED':
        case 'REPORT_RESUBMIT_REMINDER':
          return 'Edit Review';
          break;
        case 'ANSWER':
          return 'View More';
          break;
        default:
          return 'View Details';
      }
    };
  });
