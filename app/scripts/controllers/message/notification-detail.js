'use strict';

angular.module('xbertsApp')
  .controller('MessageNotificationDetailCtrl', ['_', '$scope', '$rootScope', '$state', '$stateParams', 'message', 'MessageService',
    function (_, $scope, $rootScope, $state, $stateParams, message, MessageService) {
      // $scope.messageBody = message.body.replace(/(\n|<br\s*\/>)/g, '');
      $scope.messageBody = message.body.replace(/(\n)/g, '');
      $scope.message = message;

      switch(message.category) {
        case 'PRODUCT_INQUIRY':
          $scope.actionBtnText = 'View Inquiry';
          break;
        case 'REVIEW_QUESTION':
          $scope.actionBtnText = 'Answer Question';
          break;
        case 'FEEDBACK':
        case 'COMMENT':
          $scope.actionBtnText = 'Reply to Comment';
          break;
        case 'LIKE':
          $scope.actionBtnText = 'View Review';
          break;
        case 'CONFIRM_ADDRESS':
        case 'CONFIRM_ADDRESS_REMINDER':
          $scope.actionBtnText = 'Confirm Address';
          break;
        case 'REVIEW_APPLICATION':
          $scope.actionBtnText = 'Edit Application';
          break;
        case 'REVIEW_SELECTION_ANNOUNCEMENT':
        case 'REVIEW_SELECTION_REVOKE':
          $scope.actionBtnText = 'Review Details';
          break;
        case 'REPORT_CHECK_IN':
        case 'REPORT_REMINDER':
        case 'REPORT_PAST_DUE':
        case 'SHIPPING_NOTIFICATION':
          $scope.actionBtnText = 'Submit Review';
          break;
        default:
          $scope.actionBtnText = 'View Details';
      }
    }]);
