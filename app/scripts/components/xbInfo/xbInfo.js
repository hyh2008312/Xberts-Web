angular.module('xbertsApp')
  .directive('xbInfo', function () {
    return{
      restrict:'E',
      scope:{
        info:'='
      },
      templateUrl:'scripts/components/xbInfo/xbInfo.html'
    };
  });
