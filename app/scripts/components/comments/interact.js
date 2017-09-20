angular.module('xbertsApp')
  .directive('interact', ['InteractService', 'Interact', '$rootScope', '$q', function (InteractService, Interact, $rootScope, $q) {
    return {
      restrict: 'E',
      scope: {
        interact: '='
      },

      controller: function ($scope) {

        $scope.interact = Interact.build($scope.interact);

        $scope.currentJoin = $scope.interact.currentJoin? $scope.interact.currentJoin:{vote:null};

        var self = this;

        this.getCurrentJoin = function () {
          return $scope.currentJoin;
        };

        this.getInteract = function () {
          return $scope.interact;
        };

        this.setCurrentJoin = function (join) {
          angular.extend($scope.currentJoin, join);
        };

        this.getOrCreateCurrentJoin = function () {
          var delay = $q.defer();

          if (!$rootScope.user.authRequired()) {
            delay.reject('not login');
            self.upVoteDisabled  = false;
            self.downVoteDisabled  = false;
          } else {
            if ($scope.currentJoin.id) {
              self.upVoteDisabled  = false;
              self.downVoteDisabled  = false;
              delay.resolve($scope.currentJoin);
            } else {
              InteractService.createJoin({interact: $scope.interact.id}).then(function (join) {
                self.upVoteDisabled  = false;
                self.downVoteDisabled  = false;
                angular.extend($scope.currentJoin, join);
                delay.resolve($scope.currentJoin);
              });
            }
          }

          return delay.promise;
        };

        this.vote = function () {
          if(self.upVoteDisabled == true) {
            return;
          }
          self.upVoteDisabled = true;
          self.getOrCreateCurrentJoin().then(function () {
            var currentJoin = self.getCurrentJoin();
            var join = {id: currentJoin.id, vote: !currentJoin.vote};
            if (join.vote) {
              currentJoin.vote = true;
              $scope.interact.increaseVote();
            } else {
              currentJoin.vote = false;
              $scope.interact.reduceVote();
            }
            InteractService.vote(join);
          });
        };


        this.upVoteDisabled = false;
        this.upvote = function() {
          if(self.upVoteDisabled == true) {
            return;
          }
          self.upVoteDisabled = true;
          var firstJoin = self.getCurrentJoin().vote;
          self.getOrCreateCurrentJoin(self.upVoteDisabled).then(function () {
            var currentJoin = self.getCurrentJoin();
            var join = {id: currentJoin.id, vote: currentJoin.vote == true? null: true};
            if (join.vote == true) {
              currentJoin.vote = true;
              $scope.interact.increaseVote();
            } else if(join.vote == null){
              currentJoin.vote = null;
              $scope.interact.reduceVote();
            }
            if(firstJoin == false) {
              $scope.interact.reduceDownVote();
            }
            InteractService.vote(join);
          });
        };

        self.downVoteDisabled = false;
        this.downvote = function() {
          if(self.downVoteDisabled == true) {
            return;
          }
          self.downVoteDisabled = true;
          var firstJoin = self.getCurrentJoin().vote;
          self.getOrCreateCurrentJoin(self.downVoteDisabled).then(function () {
            var currentJoin = self.getCurrentJoin();

            var join = {id: currentJoin.id, vote: currentJoin.vote == false? null: false};
            if (join.vote == false) {
              currentJoin.vote = false;
              $scope.interact.increaseDownVote();
            } else if(join.vote == null) {
              currentJoin.vote = null;
              $scope.interact.reduceDownVote();
            }
            if(firstJoin == true) {
              $scope.interact.reduceVote();
            }
            InteractService.vote(join);
          });
        };
      },
      controllerAs: 'interactCtrl',
      link: function (scope) {

      }
    };
  }]);
