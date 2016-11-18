(function () {
"use strict";

angular.module('user')
.controller('myInfoController', myInfoController);

myInfoController.$inject = ['SubscriptionService','MenuItem','ApiPath'];
function myInfoController(SubscriptionService, MenuItem, ApiPath) {
  var profileCtrl = this;
  profileCtrl.user_subscribed = false;
  var user = SubscriptionService.getUser();
  if (user) {
  	profileCtrl.user = user;
  	profileCtrl.user_subscribed = true;
  	profileCtrl.user.menuItem = MenuItem;
  	profileCtrl.user.basePath = ApiPath;
  }
}


})();
