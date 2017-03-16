angular.module('xbertsApp')
  .factory('Comment', CommentModel);


function CommentModel() {

  var AVATAR_PLACEHOLDER = 'https://xberts.imgix.net/static/icon/avatar_empty.gif?s=5b6b11a25bfa12e3a94966eb077ef16a';


  function Comment(data) {
    angular.extend(this, data);
  }

  Comment.prototype = {
    getPostAvatar: function () {
      return this.post.joiner.avatar || AVATAR_PLACEHOLDER
    },
    getPostName: function () {
      return this.post.joiner.first_name
    },
    getPostUserId: function () {
      return this.post.joiner.id;
    },
    getPostId: function () {
      return this.post.id;
    },
    getPostToAvatar: function () {
      return this.post_to.joiner.avatar || AVATAR_PLACEHOLDER
    },
    getPostToName: function () {
      return this.post_to.joiner.first_name
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
