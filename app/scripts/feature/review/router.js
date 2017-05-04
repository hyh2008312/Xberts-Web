'use strict';

angular
  .module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/crowdtesting/:reviewId', '/campaigns/:reviewId');
    $urlRouterProvider.when('/testcampaign', '/trials');
    $urlRouterProvider.when('/testcampaign/:reviewId', '/trials/:reviewId');
    $urlRouterProvider.when('/crowdtesting/:reviewId/confirmaddress', '/trials/:reviewId/confirmaddress');

    $stateProvider
      .state('application.selectApplicants', {
        url: "/trials/:reviewId/applicants",
        templateUrl: 'scripts/feature/review/applicationSelect/review_applicants.html',
        controller: 'ReviewApplicantsCtrl',
        resolve: {
          review: ['ReviewService', '$stateParams', function (ReviewService, $stateParams) {
            return ReviewService.getSurvey($stateParams.reviewId);
          }],
          pendingApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'pending_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'Unknown'
              },
              fetchFunction: ReviewService.getApplicants
            };
            return new Paginator(par).load();
          }],
          selectedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'selected_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'True'
              },
              fetchFunction: ReviewService.getApplicants
            };
            return new Paginator(par).load();
          }],
          unselectedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'unselected_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'False'
              },
              fetchFunction: ReviewService.getApplicants
            };
            return new Paginator(par).load();
          }]
        }
      })
      .state('application.selectReports', {
        url: "/trials/:reviewId/reports",
        templateUrl: 'scripts/feature/review/reportSelection/select_reports.html',
        controller: 'SelectReportsCtrl',
        resolve: {
          review: ['ReviewService', '$stateParams', function (ReviewService, $stateParams) {
            return ReviewService.getSurvey($stateParams.reviewId);
          }],
          selectedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'selected_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'True'
              },
              fetchFunction: ReviewService.getApplicants
            };
            return new Paginator(par).load();
          }],
          submittedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'submitted_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'True',
                has_submitted_report: 'True'
              },
              fetchFunction: ReviewService.getApplicants
            };
            return new Paginator(par).load();
          }]
        }
      })
      .state('application.protected.crowdtestingReport', {
        url: '/trials/:reviewId/report',
        templateUrl: 'scripts/feature/review/report/report-edit.html',
        controller: 'ReportEditCtrl',
        resolve: {
          applicant: ['ReviewService', 'protectedAuthCheck', '$stateParams',
            function (ReviewService, protectedAuthCheck, $stateParams) {
              return ReviewService.applicantProtect($stateParams.reviewId);
            }]
        }
      })
      .state('application.report', {
        url: '/trials/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}?action',
        templateUrl: 'scripts/feature/review/report/report-detail.html',
        controller: 'ReportDetailCtrl',
        resolve: {
          report: ['ReportService', '$stateParams', function (ReportService, $stateParams) {
            return ReportService.getReport($stateParams.reportId);
          }]
        }
      })
      .state('application.campaignreviews', {
        url: "/reviews",
        templateUrl: 'scripts/feature/review/report/report-list.html',
        controller: 'ReportListCtrl',
        reloadOnSearch: false,
        resolve: {
          reviews: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'all_review_list',
              objClass:MainModel,
              params: {
                page_size: 12
              },
              fetchFunction: MainService.getReviewsList
            };
            return new Paginator(par).load();
          }],
          topReviewers: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
            var par = {
              name: 'callingReview',
              objClass:MainModel,
              params: {
                stage: 'READY_FOR_SALE',
                status: 'APPLICATION',
                page_size: 20
              },
              fetchFunction:MainService.getRecommendedReviewers
            };
            return new Paginator(par).load();
          }]
        }
      })

      .state('application.testingcampaigns', {
        url: "/trials",
        templateUrl: 'scripts/feature/review/trialList/trialListPage.html',
        controller: 'TrialListPageController as trials',
        reloadOnSearch: false,
        resolve: {
          latestPaginater: ['Paginator', 'ReviewService','Review', function (Paginator, ReviewService,Review) {
            var par = {
              name: 'trials',
              objClass:Review,
              params: {
                page_size: 5,
                review_type: 'FREE_SAMPLE'
              },
              fetchFunction: ReviewService.getList
            };
            return new Paginator(par).load();
          }],
          trialPaginator: ['Paginator', 'ReviewService','Review', function (Paginator, ReviewService,Review) {
            var par = {
              name: 'end_trials',
              objClass: Review,
              params: {
                page_size: 12,
                review_type: 'FREE_SAMPLE',
                status: 'ENDED'
              },
              fetchFunction: ReviewService.getList
            };
            return new Paginator(par).load();
          }]
        }
      })
      .state('application.testingcampaign', {
        url: "/trials/{reviewId:[0-9]+}?action&tab",
        templateUrl: 'scripts/feature/review/trialDetail/trial-detail.html',
        controller: 'TrialDetailController as trial',
        reloadOnSearch: false,
        resolve: {
          review: ['$stateParams', 'ReviewService', function ($stateParams, ReviewService) {
            return ReviewService.getDetail($stateParams.reviewId);
          }],
          pendingApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', 'Report',function (Paginator, ReviewService, $stateParams, Report) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'trial_reviews_list_' + reviewId,
              objClass: Report,
              params: {
                id: reviewId,
                page_size: 12
              },
              fetchFunction: ReviewService.getReporters
            };
            return new Paginator(par).load();
          }],
          selectedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'selected_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'True',
                page_size: 12
              },
              fetchFunction: ReviewService.getApplicants
            };
            return new Paginator(par).load();
          }]
        }
      })
      .state('application.protected.apply', {
        url: "/trials/:reviewId/apply",
        templateUrl: 'scripts/feature/review/apply/apply.html',
        controller: 'ReviewApplyController as apply',
        resolve: {
          review: ['ReviewService', '$stateParams', function (ReviewService, $stateParams) {
            return ReviewService.getSurvey($stateParams.reviewId);
          }],
          applier: ['ApplierService', 'protectedAuthCheck', function (ApplierService, protectedAuthCheck) {
            return ApplierService.getCurrentApplier();
          }],
          application: ['ApplicationService', '$stateParams', 'protectedAuthCheck',
            function (ApplicationService, $stateParams, protectedAuthCheck) {
              return ApplicationService.getApplicationForReviewID($stateParams.reviewId);
            }]
        }
      })
      .state('application.protected.confirmShipAddress', {
        url: '/trials/:reviewId/confirmaddress',
        templateUrl: 'scripts/feature/review/applyConfirm/confirm-shipping-address.html',
        controller: 'ConfirmShippingAddressCtrl as confirm',
        resolve: {
          review: ['$stateParams', 'ReviewService', function ($stateParams, ReviewService) {
            return ReviewService.getSurvey($stateParams.reviewId);
          }],
          applier: ['ApplierService', 'protectedAuthCheck', function (ApplierService, protectedAuthCheck) {
            return ApplierService.getCurrentApplier();
          }],
          application: ['ReviewService', '$stateParams', 'protectedAuthCheck',
            function (ReviewService, $stateParams, protectedAuthCheck) {
              return ReviewService.applicantProtect($stateParams.reviewId);
            }]
        }
      })
    ;
  }]);
