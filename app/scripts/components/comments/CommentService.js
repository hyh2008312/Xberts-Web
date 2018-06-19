angular.module('xbertsApp')
  .service('CommentService', ['$resource','API_BASE_URL','Comment',function ($resource,API_BASE_URL,Comment) {

    var CommentResource = $resource(API_BASE_URL + '/interact/comments/:commentId/', null);

    this.getList = function (params) {
      return CommentResource.get(params).$promise.then(Comment.buildPageList);
    };

    this.create = function (comment) {
      return CommentResource.save(comment).$promise.then(Comment.build);
    }
  }]);
