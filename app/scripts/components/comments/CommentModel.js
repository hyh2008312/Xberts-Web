angular.module('xbertsApp')
  .factory('Comment', CommentModel);


function CommentModel() {

  function Comment(data) {
    angular.extend(this, data);
  }

  Comment.prototype = {
    getPostAvatar: function () {
      return this.post.joiner.avatar;
    },
    getPostName: function () {
      return this.post.joiner.first_name;
    },
    getPostUserId: function () {
      return this.post.joiner.id;
    },
    getPostId: function () {
      return this.post.id;
    },
    getPostToAvatar: function () {
      return this.post_to.joiner.avatar;
    },
    getPostToName: function () {
      return this.post_to.joiner.first_name;
    },
    getPostToUserId: function () {
      return this.post_to.joiner.id;
    },
    getPostToId: function () {
      return this.post_to.id;
    }
  };

  Comment.build = function (data) {
    return new Comment(data)
  };

  Comment.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return Comment.build(item);
    });

    return data;
  };

  Comment.buildList = function (data) {
    return data.map(function (item) {
      return Comment.build(item);
    })
  };

  return Comment;
}
