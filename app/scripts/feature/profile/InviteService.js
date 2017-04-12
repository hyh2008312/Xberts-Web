'use strict';

angular.module('xbertsApp')
  .service('InviteService', ['$rootScope',function ($rootScope) {

    var AppId = '1109067122496559';
    var getText = function(text) {
      return text || 'Xberts – Explore innovative gadgets and designs';
    };
    var getDescription = function(description) {
      return description || 'Xberts is a community for you to discover, try and share the latest tech innovations and creative designs.';
    };
    var MessageTitle = function(title) {
      return title || 'Join me on Xberts - Explore innovative gadgets and designs';
    };
    var MessageBody = function(message) {
      return message || 'Hi there, I would love to invite you to join me on Xberts where you can discover latest gadgets, win free samples, and redeem amazing gifts! If you’re interested, please check out their website: https://www.xberts.com/?source=userrefer_' + $rootScope.user._inviteToken;
    };
    var getRedirectUri = function(url) {
      return (url || 'https://www.xberts.com/?source=userrefer_') + $rootScope.user._inviteToken;
    };
    var getUrl = function(url) {
      return (url || 'https://www.xberts.com/?source=userrefer_') + $rootScope.user._inviteToken;
    };
    var getSource = function(source) {
      return source || 'https://xberts.imgix.net/static/logo/38625fa6-80c3-49a4-972a-8d69f49bb3e6.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=db9bb8eda2b7e97e35cb821b704fe912';
    };

    return {
      appId : AppId,
      text : getText,
      description : getDescription,
      messageTitle : MessageTitle,
      messageBody : MessageBody,
      redirectUri : getRedirectUri,
      url : getUrl,
      source : getSource
    };

  }]);
