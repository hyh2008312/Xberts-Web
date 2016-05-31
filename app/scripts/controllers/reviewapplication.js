'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationCtrl', ['$scope', '$rootScope', 'review', 'reviewer', 'application',
    function ($scope, $rootScope, review, reviewer, application) {

      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.application = application;
      // todo:每个人只能填写一份调查问卷
      $scope.review = review;
      $scope.profile = reviewer;
      if ($scope.profile.mail_country == 'ZZ') {
        $scope.profile.mail_country = ''
      }

      //padding answer to review.survey
      if (application.id) {
        var answer = JSON.parse(application.answer);
        for (var i = 0; i < $scope.review.surveys.length; i++) {
          for (var j = 0; j < $scope.review.surveys[i].questions.length; j++) {
            var questionId = $scope.review.surveys[i].questions[j].id;
            $scope.review.surveys[i].questions[j]['answer'] = answer['question_' + questionId] || {};
          }
        }
      }
      if ($scope.profile.birth !== null) {
        $scope.profile.birth = new Date($scope.profile.birth);
      }
      $scope.profile.linkedin = true;
      $scope.redirect = false;
      $scope.active = 0;
      $scope.tabs = [
        {index: 0, active: true, disable: false},
        {index: 1, active: false, disable: true},
        {index: 2, active: false, disable: true},
        {index: 3, active: false, disable: true}
      ];
      $scope.$on('reviewStep', function (e, d) {
        var step = Number(d);
        $scope.active = step + 1;
        $scope.tabs[step + 1].disable = false;
        $scope.tabs[step + 1].active = true;
        if (step === 2) {
          $scope.redirect = true;
          $scope.tabs[0].disable = true;
          $scope.tabs[1].disable = true;
          $scope.tabs[2].disable = true;
        }
        e.stopPropagation();
      });
      $scope.select = function (step) {
        $scope.$broadcast('stepBroadcast', step);
      };
    }])
  .controller('ReviewApplicantsCtrl', ['$scope', '$rootScope', '$filter', '$uibModal', 'SystemConstant', '$state', 'Review', 'review',
    function ($scope, $rootScope, $filter, $uibModal, SystemConstant, $state, Review, review) {
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.COUNTRIES = SystemConstant.COUNTRIES;
      $scope.SOCIAL_TYPE = SystemConstant.SOCIAL_TYPE;
      $scope.LINKEDIN_CONNECTION = SystemConstant.LINKEDIN_CONNECTION;
      $scope.OTHER_CONNECTION = SystemConstant.OTHER_CONNECTION;
      $scope.JOB_FUNCTION = SystemConstant.JOB_FUNCTION;
      $scope.INDUSTRY = SystemConstant.INDUSTRY;
      $scope.review = review;
      var applicants_old = $filter('orderBy')(review.applicants, ['-is_selected', '+sequence_number']);
      if ($rootScope.user.isStaff()) {
        $scope.applicants = applicants_old;
      } else {
        $scope.applicants = $filter('filter')(applicants_old, {reviewer: {is_bad_reviewer: false}});
      }
      if ($rootScope.user.getUserId() != review.owner_id && !$rootScope.user.isStaff()) {
        $state.go('application.main')
      }
      $scope.applicantLeft = $scope.review.quota - $filter('filter')($scope.applicants, {is_selected: true}).length;
      $scope.publish = function () {
        $scope.$emit('backdropOn', 'post');
        var r = new Review({id: review.id, is_publish_applicants: true});
        r.$patch(function () {
          $scope.review.is_publish_applicants = true;
          $scope.$emit('backdropOff', 'success');
        }, function () {
          $scope.$emit('backdropOff', 'success');
        })
      };
      $scope.ConfirmSelectionResult = function () {
        $scope.$emit('backdropOn', 'post');
        var r = new Review({id: review.id, is_publish_applicants_confirmed: true, confirm: true});
        r.$patch(function () {
          $scope.review.is_publish_applicants_confirmed = true;
          $scope.$emit('backdropOff', 'success');
        }, function () {
          $scope.$emit('backdropOff', 'success');
        })
      };
      $scope.condition = $scope.review.is_publish_applicants_confirmed ? 'Selected' : 'Pending';
      $scope.applicantsFilter = function () {
        switch ($scope.condition) {
          case "Dismissed":
            $scope.filterApplicants = $filter('filter')($scope.applicants, {is_selected: false});
            break;
          case "Selected":
            $scope.filterApplicants = $filter('filter')($scope.applicants, {is_selected: true});
            break;
          case "Pending":
            $scope.filterApplicants = $filter('filter')($scope.applicants, {is_selected: null});
            break;
        }
      };
      $scope.applicantsFilter();
      $scope.ChangeCondition = function (condition) {
        $scope.condition = condition;
        $scope.applicantsFilter();
      };

      $scope.markShipped = function (size, index) {
        if (!$rootScope.user.authRequired()) {
          return;
        }
        var modalInstance = $uibModal.open({
          templateUrl: 'views/review/review_applicant_mark_shipped.html',
          controller: 'ReviewMarkShippedCtrl',
          size: size,
          resolve: {
            applicant: function () {
              return $scope.filterApplicants[index];
            },
            review: function () {
              return $scope.review;
            },
            applicantLeft: function () {
              return $scope.applicantLeft;
            }
          }
        });
        modalInstance.result.then(function () {
          $scope.applicantLeft = $scope.review.quota - $filter('filter')($scope.applicants, {is_selected: true}).length;
          $scope.applicantsFilter();
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.open = function (size, index) {
        if (!$rootScope.user.authRequired()) {
          return;
        }
        var modalInstance = $uibModal.open({
          templateUrl: 'views/review/review_applicant_approval.html',
          controller: 'ReviewApprovalCtrl',
          size: size,
          resolve: {
            applicant: function () {
              return $scope.filterApplicants[index];
            },
            review: function () {
              return $scope.review;
            },
            applicantLeft: function () {
              return $scope.applicantLeft;
            }
          }
        });
        modalInstance.result.then(function () {
          $scope.applicantLeft = $scope.review.quota - $filter('filter')($scope.review.applicants, {is_selected: true}).length;
          $scope.applicantsFilter();
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };
    }])
  .controller('ReviewApprovalCtrl', ['$scope', '$uibModalInstance', 'SystemConstant', 'applicant', 'review', 'ReviewApplicant', 'applicantLeft',
    function ($scope, $uibModalInstance, SystemConstant, applicant, review, ReviewApplicant, applicantLeft) {
      $scope.COUNTRIES = SystemConstant.COUNTRIES;
      $scope.GENDER_TYPE = SystemConstant.GENDER_TYPE;
      $scope.CAREER_STATUS = SystemConstant.CAREER_STATUS;
      $scope.COMPANY_SIZE = SystemConstant.COMPANY_SIZE;
      $scope.JOB_FUNCTION = SystemConstant.JOB_FUNCTION;
      $scope.INDUSTRY = SystemConstant.INDUSTRY;
      $scope.SOCIAL_TYPE = SystemConstant.SOCIAL_TYPE;
      $scope.LINKEDIN_CONNECTION = SystemConstant.LINKEDIN_CONNECTION;
      $scope.OTHER_CONNECTION = SystemConstant.OTHER_CONNECTION;
      $scope.review = review;
      $scope.applicant = applicant;
      $scope.applicantLeft = applicantLeft;
      $scope.select = function (isSelected) {
        $scope.$emit('backdropOn', 'post');
        var applicant;
        applicant = ReviewApplicant.getApplicationResource({id: $scope.applicant.id, is_selected: isSelected});
        applicant.$patch(function () {
          $scope.applicant.is_selected = isSelected;
          $scope.$emit('backdropOff', 'success');
          $uibModalInstance.close();
        }, function () {
          $scope.$emit('backdropOff', 'success');
        })
      };
      $scope.close = function () {
        $uibModalInstance.dismiss();
      };
      if (applicant.answer) {
        $scope.answer = JSON.parse(applicant.answer);
      }
    }])
  .controller('ReviewMarkShippedCtrl', ['$scope', '$uibModalInstance', 'applicant', 'review', 'ReviewApplicant',
    function ($scope, $uibModalInstance, applicant, review, ReviewApplicant) {
      $scope.review = review;
      $scope.backApplicant = applicant;
      $scope.applicant = ReviewApplicant.getApplicationResource(
        {
          id: applicant.id,
          is_shipped: true,
          ship: true,
          shipping_code: applicant.shipping_code,
          carrier: applicant.carrier
        });
      $scope.save = function () {
        if ($scope.shippingForm.$valid) {
          $scope.$emit('backdropOn', 'post');

          $scope.applicant.$patch(function (data) {
            applicant.is_shipped = true;
            applicant.shipping_code = $scope.applicant.shipping_code;
            applicant.carrier = $scope.applicant.carrier;
            $scope.$emit('backdropOff', 'success');
            $uibModalInstance.close();
          }, function () {
            $scope.$emit('backdropOff', 'success');
          })

        } else {
          $scope.shippingForm.submitted = true;
          $scope.shippingForm.$invalid = true;
        }


      };

      $scope.close = function () {
        $uibModalInstance.dismiss();
      };
    }])
  .controller('ReviewReportsCtrl', ['$scope', '$rootScope', 'review', '$state', function ($scope, $rootScope, review, $state) {
    $rootScope.pageSettings.setBackgroundColor('background-whitem');
    $scope.review = review;
    if ($rootScope.user.getUserId() != review.owner_id && !$rootScope.user.isStaff()) {
      $state.go('application.main')
    }
  }]);
