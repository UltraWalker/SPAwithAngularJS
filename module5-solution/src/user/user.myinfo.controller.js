(function () {
"use strict";

angular.module('user')
.controller('myInfoController', myInfoController);

myInfoController.$inject = ['SubscriptionService'];
function myInfoController(SubscriptionService) {
  var profileCtrl = this;
  profileCtrl.user_subscribed = false;
  var user = SubscriptionService.getUser();
  if (user) {
  	profileCtrl.user = user;
  	profileCtrl.user_subscribed = true;
  }
}


})();
