angular.module('xbertsApp')
  .factory('Feedback', ['Comment',FeedbackModel]);
function FeedbackModel(Comment) {

  var AVATAR_PLACEHOLDER = 'https://xberts.imgix.net/static/icon/avatar_empty.gif?s=5b6b11a25bfa12e3a94966eb077ef16a';


  function Feedback(data) {
    angular.extend(this, data);
  }

  Feedback.prototype = {
    getPostAvatar: function () {
      return this.post.joiner.avatar || AVATAR_PLACEHOLDER;
    },
    getPostName: function () {
      return this.post.joiner.first_name;
    },
    getPostId: function () {
      return this.post.id;
    }
  };

  Feedback.build = function (data) {
    var feedback = new Feedback(data);
    if(angular.isArray(feedback.comments)){
      feedback.comments = Comment.buildList(feedback.comments);
    }
    return feedback;
  };

  Feedback.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return Feedback.build(item);
    });

    return data;
  };

  Feedback.buildList = function (data) {
    return data.map(function (item) {
      return Feedback.build(item);
    })
  };

  return Feedback;
}
