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
              fetchFunction: function (params) {
                return ReviewService.getApplicants(params);
              }
            };
            return Paginator(par).load();
          }],
          selectedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'selected_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'True'
              },
              fetchFunction: function (params) {
                return ReviewService.getApplicants(params);
              }
            };
            return Paginator(par).load();
          }],
          unselectedApplicantPaginator: ['Paginator', 'ReviewService', '$stateParams', function (Paginator, ReviewService, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            var par = {
              name: 'unselected_applicant_list_' + reviewId,
              params: {
                id: reviewId,
                is_selected: 'False'
              },
              fetchFunction: function (params) {
                return ReviewService.getApplicants(params);
              }
            };
            return Paginator(par).load();
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
              fetchFunction: function (params) {
                return ReviewService.getApplicants(params);
              }
            };
            return Paginator(par).load();
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
              fetchFunction: function (params) {
                return ReviewService.getApplicants(params);
              }
            };
            return Paginator(par).load();
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
          report: ['ReviewReport', '$stateParams', function (ReviewReport, $stateParams) {
            return ReviewReport.get({reviewId: $stateParams.reviewId, id: $stateParams.reportId}).$promise;
          }]
        }
      })
      .state('application.campaignreviews', {
        url: "/reviews",
        templateUrl: 'scripts/feature/review/report/report-list.html',
        controller: 'ReportListCtrl',
        reloadOnSearch: false,
        resolve: {
          reviewPaginator: ['Paginator', 'AllReport', function (Paginator, AllReport) {
            var par = {
              name: 'all_report_list',
              params: {
                page_size: 12
              },
              fetchFunction: function (params) {
                return AllReport.get(params).$promise;
              }
            };
            return Paginator(par).load();
          }],
          topReviewPaginator: ['Paginator', 'AllReport', function (Paginator, AllReport) {
            var par = {
              name: 'top_report_list',
              params: {
                page_size: 10,
                order:'TOP'
              },
              fetchFunction: function (params) {
                return AllReport.get(params).$promise;
              }
            };
            return Paginator(par).load();
          }]
        }
      })
      .state('application.main', {
        url: "/",
        templateUrl: 'scripts/feature/review/review-main.html',
        controller: 'ReviewMainCtrl',
        reloadOnSearch: false,
        resolve: {
          reviewerPaginator: ['Paginator', 'ReviewService', function (Paginator, ReviewService) {
            var par = {
              name: 'callingReview',
              params: {
                stage: 'READY_FOR_SALE',
                status: 'APPLICATION',
                page_size: 12
              },
              fetchFunction: function (params) {
                return ReviewService.getRecommendedReviewers(params);
              }
            };
            return Paginator(par).load();
          }],
          betaReviewPaginator: ['Paginator', 'ReviewService', function (Paginator, ReviewService) {
            var par = {
              name: 'progressingReview',
              params: {
                page_size: 12,
                review_type: 'FREE_SAMPLE'
              },
              fetchFunction: function (params) {
                return ReviewService.getList(params);
              }
            };
            return Paginator(par).load();
          }],
          recommendedReportsPaginator: ['Paginator', 'AllReport', function (Paginator, AllReport) {
            var par = {
              name: 'all_report_list',
              params: {
                page_size: 12
              },
              fetchFunction: function (params) {
                return AllReport.get(params).$promise;
              }
            };
            return Paginator(par).load();
          }]
        }
      })

      .state('application.testingcampaigns', {
        url: "/trials",
        templateUrl: 'scripts/feature/review/trialList/trialListPage.html',
        controller: 'TrialListPageController as trials',
        reloadOnSearch: false,
        resolve: {
          trialPaginator: ['Paginator', 'ReviewService', function (Paginator, ReviewService) {
            var par = {
              name: 'trials',
              params: {
                page_size: 12,
                review_type: 'FREE_SAMPLE'
              },
              fetchFunction: function (params) {
                return ReviewService.getList(params);
              }
            };
            return Paginator(par).load();
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
          applier: ['ReviewService','protectedAuthCheck', function (ReviewService,protectedAuthCheck) {
            return ReviewService.getCurrentApplier();
          }],
          application: ['ApplicationService', '$stateParams','protectedAuthCheck',
            function (ApplicationService, $stateParams,protectedAuthCheck) {
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
          applier: ['ReviewService','protectedAuthCheck', function (ReviewService,protectedAuthCheck) {
            return ReviewService.getCurrentApplier();
          }],
          application: ['ReviewService', '$stateParams','protectedAuthCheck',
            function (ReviewService, $stateParams,protectedAuthCheck) {
              return ReviewService.applicantProtect($stateParams.reviewId);
            }]
        }
      })
    ;
  }]);
