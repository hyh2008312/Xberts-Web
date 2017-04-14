angular.module('xbertsApp')
  .directive('perks', function () {
    return {
      restrict: 'E',
      scope: {
        points: '='
      },
      templateUrl: 'scripts/feature/credit/perks/perks.html',
      link: function (scope, element, attrs, ctrls) {
        scope.level = [];
        if(scope.points >= 200 && scope.points < 500) {
          scope.level = [{
            img:'https://xberts.imgix.net/static/icon/b31912d9-e787-4786-84f6-1a97ec57c1b4.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=a3b0dadb690bc03e7940605d388b3713',
            text:'Xberts newsletter on latest trials'
          }, null,{
            img:'https://xberts.imgix.net/static/icon/b5911f77-6b65-4d5d-bd42-a6c3405087b6.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=6e935c59ad4415fefed1f9f2c9c0d26a',
            text:'An APPLE badge in your profile page'
          }];
        } else if(scope.points >= 500 && scope.points < 800) {
          scope.level = [{
            img:'https://xberts.imgix.net/static/icon/37c3f8dc-a3a4-4178-b816-b9a875535412.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=29af199adb2a8b35044f4afdc185a3fb',
            text:'Early preview of tech gadgets before they release'
          }, null, {
            img:'https://xberts.imgix.net/static/icon/c9a54295-c97d-422c-86b9-c529205debe3.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=312d4ff833a1b7f24df2a6782ebcf5e8',
            text:'A STAR badge in your profile page'
          }];
        } else if(scope.points >= 800) {
          scope.level = [{
            img:'https://xberts.imgix.net/other/c2dc10e5-2da2-4711-a1fc-0a8cf1b8f357.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=33aea94c4768433f5bde4ea8f8e736d3',
            text:'A TROPHY badge in your profile page'
          }, null, {
            img:'https://xberts.imgix.net/static/icon/2d52c5fc-a930-4e96-ab42-cfaf7b66dd31.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=4de09b81161d969725a7f6ded2b23eba',
            text:'3 members with the highest points will be invited to attend CES 2018'
          }];
        }
      }
    }
  })
  .directive('perksLevel', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope:{
        points: '='
      },
      link: function (scope, element, attrs, ctrls) {
        var html = '';
        if(scope.points >= 200 && scope.points < 500) {
          html = 'Congratulations! You have become an Xberts <span>Tech Enthusiast!</span>';
        } else if(scope.points >= 500 && scope.points < 800) {
          html = 'Congratulations! You have become an Xberts <span>Tech Influencer!</span>';
        } else if(scope.points >= 800) {
          html = 'Congratulations! You have become an Xberts <span>Tech Geek!</span>';
        }
        element.append(html);
      }
    }
  }]);
