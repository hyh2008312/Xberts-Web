angular.module('xbertsApp')
  .service('VerificationEmailService', ['$resource','API_BASE_URL',
    function ($resource, API_BASE_URL) {

    var ActiveResource = $resource(API_BASE_URL + '/accounts/verify/email/',null);


    this.activeEmail = function(params) {
      return ActiveResource.get(params).$promise;
    };

    this.validateEmail = function (params) {
      return $resource(API_BASE_URL + '/accounts/verify/email/'+params.uid+'/' + params.token+'/').get().$promise;
    };

    this.emailSend = true;

  }]);
