(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SubscriptionService', 'shortNames'];
function SignUpController(SubscriptionService, shortNames) {
  var signupCtrl = this;
  signupCtrl.user = {};
  signupCtrl.user.short_name = null;
  signupCtrl.short_name_invalid = false;
  signupCtrl.short_names = shortNames;
  signupCtrl.user_subscribed = SubscriptionService.userSubscribed();

  signupCtrl.subscribe = function() {
    if(signupCtrl.user.short_name==undefined) {
      signupCtrl.short_name_invalid = true;
      return false;
    }
  	var short_name = signupCtrl.user.short_name.toUpperCase();
  	var promise = SubscriptionService.validateShortName(short_name);
  	promise.then(function(validated){
  		signupCtrl.short_name_invalid = !validated;
  		if(validated) {
  			var result = SubscriptionService.saveUser(signupCtrl.user);
  			if(result) {
  				signupCtrl.user_subscribed = true;
  			}
  		}
  	});
  }
}

})();
