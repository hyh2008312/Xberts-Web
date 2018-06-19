'use strict';

angular
  .module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/trials', '/crowdtesting');
    $urlRouterProvider.when('/trials/:reviewId', '/crowdtesting/:reviewId');
    $urlRouterProvider.when('/trials/:reviewId/reports', '/crowdtesting/:reviewId/reports');
    $urlRouterProvider.when('/trials/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}?action',
      '/crowdtesting/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}?action');
    $urlRouterProvider.when('/trials/:reviewId/applicants', '/crowdtesting/:reviewId/applicants');
    $urlRouterProvider.when('/trials/:reviewId/report', '/crowdtesting/:reviewId/report');
    $urlRouterProvider.when('/trials/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}?action',
      '/crowdtesting/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}?action');
    $urlRouterProvider.when('/trials/{reviewId:[0-9]+}?action&tab',
      '/crowdtesting/{reviewId:[0-9]+}?action&tab');
    $urlRouterProvider.when('/trials/:reviewId/apply', '/crowdtesting/:reviewId/apply');
    $urlRouterProvider.when('/trials/:reviewId/confirmaddress', '/crowdtesting/:reviewId/confirmaddress');
    $urlRouterProvider.when('/trials/:reviewId/guide', '/crowdtesting/:reviewId/guide');

    $stateProvider
      .state('application.selectApplicants', {
        url: "/crowdtesting/:reviewId/applicants",
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
        url: "/crowdtesting/:reviewId/reports",
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
        url: '/crowdtesting/:reviewId/report',
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
        url: '/crowdtesting/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}?action',
        templateUrl: 'scripts/feature/review/report/report-detail.html',
        controller: 'ReportDetailCtrl',
        resolve: {
          report: ['ReportService', '$stateParams', function (ReportService, $stateParams) {
            return ReportService.getReport($stateParams.reportId);
          }]
        }
      })
      .state('application.testingcampaigns', {
        url: "/crowdtesting",
        templateUrl: 'scripts/feature/review/trialList/trialListPage.html',
        controller: 'TrialListPageController as trials',
        reloadOnSearch: false,
        resolve: {
          latestPaginater: ['Paginator', 'ReviewService','Review', function (Paginator, ReviewService,Review) {
            if(!ReviewService.latestPaginater) {
              var par = {
                name: 'trials',
                objClass:Review,
                params: {
                  page_size: 6,
                  review_type: 'FREE_SAMPLE'
                },
                fetchFunction: ReviewService.getList
              };
              ReviewService.latestPaginater = new Paginator(par);
              return ReviewService.latestPaginater.load();
            } else {
              return ReviewService.latestPaginater;
            }
          }],
          trialPaginator: ['Paginator', 'ReviewService','Review', function (Paginator, ReviewService,Review) {
            if(!ReviewService.trialPaginator) {
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
              ReviewService.trialPaginator = new Paginator(par);
              return ReviewService.trialPaginator.load();
            }  else {
              return ReviewService.trialPaginator;
            }
          }]
        }
      })
      .state('application.testingcampaign', {
        url: "/crowdtesting/{reviewId:[0-9]+}?action&tab",
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
        url: "/crowdtesting/:reviewId/apply",
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
        url: '/crowdtesting/:reviewId/confirmaddress',
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
      .state('application.reviewGuide', {
        url: '/crowdtesting/:reviewId/guide',
        templateUrl: 'scripts/feature/review/reviewGuide/reviewGuide.html',
        controller: 'ReviewGuideCtrl',
        resolve: {
          review: ['$stateParams', 'ReviewService', function ($stateParams, ReviewService) {
            return ReviewService.getDetail($stateParams.reviewId);
          }]
        }
      })
      .state('application.campaignreviews', {
        url: "/articles",
        templateUrl: 'scripts/feature/review/report/report-list.html',
        controller: 'ReportListCtrl',
        reloadOnSearch: false,
        resolve: {
          reviewsFeaturedTop: ['Paginator', 'ReviewService', 'MainModel',
            function (Paginator, ReviewService, MainModel) {
              if(!ReviewService.reviewsFeaturedTop) {
                var par = {
                  name: 'all_review_list_featured_top',
                  objClass:MainModel,
                  params: {
                    is_recommended:'True',
                    edit_status:'PUBLISHED',
                    approval_status:'APPROVED',
                    page_size: 4
                  },
                  fetchFunction: ReviewService.getArticleList
                };
                ReviewService.reviewsFeaturedTop = new Paginator(par);
                return ReviewService.reviewsFeaturedTop.load();
              } else {
                return ReviewService.reviewsFeaturedTop;
              }
            }]
        }
      })
      .state('application.blogReport', {
        url: '/articles/:blogId',
        templateUrl: 'scripts/feature/review/reviewDetail/reviewDetail.html',
        controller: 'ReviewDetailCtrl',
        resolve: {
          report: ['ReviewService', '$stateParams', function (ReviewService, $stateParams) {
            return ReviewService.getBlogDetail($stateParams.blogId);
          }],
          blogPaginator: ['DealsService','$stateParams',function (DealsService,$stateParams) {
            return [];
            // return DealsService.getRecommendList($stateParams.reportId);
          }]
        }
      })
      .state('application.protected.reviewReport', {
        url: '/articles/post/edit',
        templateUrl: 'scripts/feature/review/reviewReport/EditReportCtrl.html',
        controller: 'EditReportCtrl'
      });
  }]);
