'use strict';

angular
  .module('xbertsApp')
  .run(['$rootScope', '$state', '$stateParams', '$window', 'localStorageService', 'PageService', 'SignupService',
    'SocialShare', '$location','OAuthToken', 'Configuration', 'AuthService','ExchangeRateService','$timeout','$mdDialog',
    'LoginDialogFactory','$mdMedia','GooglePlusLogin','BrowserUtil',
    function ($rootScope, $state, $stateParams, $window, localStorageService, PageService, SignupService,
              SocialShare, $location, OAuthToken, Configuration, AuthService,ExchangeRateService,$timeout,$mdDialog,
              LoginDialogFactory,$mdMedia,GooglePlusLogin,BrowserUtil) {

      // to checkout out if token is expire
      $rootScope.$on('Keepalive', function() {
        var oauthTokenExpireDate = OAuthToken.getTokenExpireDate();
        if ($rootScope.user.isAuth() &&
          oauthTokenExpireDate &&
          oauthTokenExpireDate - new Date().getTime() < Configuration.tokenRefreshThreshold * 1000) {
          // Token is about to expire, try to refresh it
          AuthService.refreshToken();
        }
      });

      $rootScope.$on('logout', function(event, shouldMakeApiCall) {
        $rootScope.$emit('backdropOn', 'delete');

        AuthService.logout(shouldMakeApiCall)
          .then(function(response) {
            $rootScope.$emit('backdropOff', 'success');

            $state.go('application.main',{},{reload:true});
          })
          .catch(function(response) {
            $rootScope.$emit('backdropOff', 'error');

            $state.go('application.main');
          });
      });

      $rootScope.state = $state;
      $rootScope.stateParams = $stateParams;
      $rootScope.unreadDirectMessageCount = 0;
      $rootScope.unreadNotificationMessageCount = 0;
      $rootScope.unreadMessageCount = 0;
      $rootScope.summerNoteSimple = {
        height: 200,
        toolbar: [
          ['style', ['bold', 'italic', 'strikethrough']],
          ['fontface', ['fontname']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link']]
        ]
      };
      $rootScope.pageSettings = PageService.pageSetting;
      $rootScope.summerNoteFull = {
        height: 700,
        shortcuts: false,
        toolbar: [
          ['headline', ['style']],
          ['style', ['bold', 'italic']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen','undo', 'redo']]
        ],
        styleTags: ['h1','p'],
        icons: {
          'align': 'fa fa-align-left',
          'alignCenter': 'fa fa-align-center',
          'alignJustify': 'fa fa-align-justify',
          'alignLeft': 'fa fa-align-left',
          'alignRight': 'fa fa-align-right',
          'indent': 'fa fa-indent',
          'outdent': 'fa fa-outdent',
          'arrowsAlt': 'fa fa-arrows-alt',
          'bold': 'fa fa-bold',
          'caret': 'caret',
          'circle': 'fa fa-circle',
          'close': 'fa fa-close',
          'code': 'fa fa-code',
          'eraser': 'fa fa-eraser',
          'font': 'fa fa-font',
          'frame': 'fa fa-frame',
          'italic': 'fa fa-italic',
          'link': 'fa fa-link',
          'unlink': 'fa fa-chain-broken',
          'magic': 'fa fa-header',
          'menuCheck': 'fa fa-check',
          'minus': 'fa fa-minus',
          'orderedlist': 'fa fa-list-ol',
          'pencil': 'fa fa-pencil',
          'picture': 'fa fa-picture-o',
          'question': 'fa fa-question',
          'redo': 'fa fa-repeat',
          'square': 'fa fa-square',
          'strikethrough': 'fa fa-strikethrough',
          'subscript': 'fa fa-subscript',
          'superscript': 'fa fa-superscript',
          'table': 'fa fa-table',
          'textHeight': 'fa fa-text-height',
          'trash': 'fa fa-trash',
          'underline': 'fa fa-underline',
          'undo': 'fa fa-undo',
          'unorderedlist': 'fa fa-list-ul',
          'video': 'fa fa-youtube-play'
        },
        popover: {
          image:[
            ['imagesize',['imageSize100','imageSize50','imageSize25']],
            ['float',['floatLeft','floatRight','floatNone']]
          ],
          link: [
            ['link', ['linkDialogShow', 'unlink']]
          ],
          air: [
            ['color', ['color']],
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']]
          ]
        }
      };
      $rootScope.xbertsApp =  BrowserUtil.isXbertApp();

      SocialShare.createSocialShare($location.absUrl());

      ExchangeRateService.getRate();

      localStorageService.clearAll();
      // Capture potential campaign/source query param
      SignupService.saveSourceParam();

      $rootScope.$on('$stateChangeStart', function() {
        angular.element(".xb-body-view").off('scroll');
        angular.element(".xb-body-view").off('resize');
        if($rootScope.state.current.name == 'application.productDeals') {
          $timeout.cancel(LoginDialogFactory.timer);
          $mdDialog.cancel();
        }
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        if(!LoginDialogFactory.signUpDialog) {
          if(!LoginDialogFactory.dialogfirstTime) {
            if($rootScope.state.current.name == 'application.productDeals') {
              if(!$rootScope.user.isAuth()) {
                LoginDialogFactory.timer = $timeout(function() {
                  if(!$mdMedia('xs') && !$rootScope.user.authRequired(true)) {
                    return;
                  }
                }, 10000);
              } else {
                $timeout.cancel(LoginDialogFactory.timer);
                $mdDialog.cancel();
              }
            } else {
              $timeout.cancel(LoginDialogFactory.timer);
              $mdDialog.cancel();
            }
          } else {
            if($rootScope.state.current.name == 'application.productDeals') {
              if(!$rootScope.user.isAuth()) {
                LoginDialogFactory.timer = $timeout(function() {
                  if(!$mdMedia('xs') && !$rootScope.user.authRequired(true)) {
                    LoginDialogFactory.signUpDialog = true;
                    return;
                  }
                }, 30000);
              } else {
                $timeout.cancel(LoginDialogFactory.timer);
                $mdDialog.cancel();
              }
            } else {
              $timeout.cancel(LoginDialogFactory.timer);
              $mdDialog.cancel();
            }
          }

        } else {
          $timeout.cancel(LoginDialogFactory.timer);
          $mdDialog.cancel();
        }
      });

      $rootScope.$on('$viewContentLoading', function() {
        if(angular.element(".xb-body-view").length>0)
        {
          if($rootScope.state.current.name != 'application.askQuestionMain.answerQuestionDetail'
            && $rootScope.state.current.name != 'application.askQuestionMain') {
            angular.element(".xb-body-view").scrollTop(0);
          }
        }
      });

      // Load facebook SDK
      $window.fbAsyncInit = function() {
        FB.init({
          appId      : '1109067122496559',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.5'
        });
      };


      $window._startGoogleSignin = GooglePlusLogin._loadCallback;

      (function(d,s) {
        // Load the SDK asynchronously
        var po = d.createElement(s);
        po.type = 'text/javascript';
        po.async = true;
        po.src =
          'https://apis.google.com/js/client:platform.js?onload=_startGoogleSignin';
        var _s = d.getElementsByTagName('script')[0];
        _s.parentNode.insertBefore(po, _s);
      }(document, 'script'));


      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      BrowserUtil.fixedProblems();
    }]);
