angular.module('xbertsApp')
  .directive('mainQuestionItem',['$rootScope','AskService','localStorageService',function ($rootScope,AskService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        questions: '='
      },
      templateUrl: 'scripts/feature/main/mainQuestionItem/main-question-item.html',
      link: function (scope, element, attrs, ctrls) {
        var imagesPC = [
          'https://xberts.imgix.net/static/banner/07042767-d7ad-4cf0-b6a8-4d84d3700aec.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=de7af08def5459338c0ebe1725eeda79',
          'https://xberts.imgix.net/static/banner/e8009eae-0f8c-49f2-a9fb-cd3189ef1587.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=125ecd96846bca77a8282166ed3292ad'
        ];

        var imagesMobile = [
          'https://xberts.imgix.net/static/banner/6478d84a-86ac-4a0b-aadb-1bb4ac6bc7d3.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=c7b8dd260aeb8a0a636aefac0cbd6f2c',
          'https://xberts.imgix.net/static/banner/9f11cffb-577c-4424-93d5-63a870c44f8c.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=da560fd67f23881640dc9449965e4a1b'
        ];

        scope.imagesPC = '';
        scope.imagesMobile = '';
        scope.imagesPC = imagesPC[Math.floor(Math.random() * 2)];
        scope.imagesMobile = imagesMobile[Math.floor(Math.random() * 2)];

        for(var i = 0; i < scope.questions.length;i++) {
          if(scope.questions[i].latestAnswer != null) {
            scope.latestQuestions = scope.questions[i];
            break;
          }
        }

        scope.follow = function(question) {
          if(!$rootScope.user.authRequired()) {
            return;
          }

          AskService.follow(question.id).then(function(data) {
            if(question.currentUser) {
              question.currentUser.follow = data.follow;
            } else {
              question.currentUser = {};
              question.currentUser.follow = data.follow;
            }
            if(data.follow) {
              question.followeeCount++;
            } else {
              question.followeeCount--;
            }
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_currentPage');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_items');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_next');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_count');
          }, function() {});
        };

        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "linkedin" },
          { name: "twitter" }
        ];


      }
    }
  }]);
